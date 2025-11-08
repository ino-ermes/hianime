import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Comment, { IComment } from '../models/Comment';
import CommentVote from '../models/CommentVote';
import { FlattenMaps, Types } from 'mongoose';
import commentQueue from '../queues/comment-queue';

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ comment });
};

export const createComment = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { episode } = req.query;

  req.body.user = user;
  req.body.episode = episode;
  req.body.upvote = 0;
  req.body.devote = 0;
  req.body.replyCount = 0;

  const comment = await Comment.create(req.body);

  if (req.body.parentComment) {
    await Comment.updateOne(
      { _id: req.body.parentComment },
      { $inc: { replyCount: 1 } }
    );
  }

  await comment.populate('user', ['name', 'avtPath']);

  commentQueue.add(comment._id.toString(), {
    action: 'comment',
    comment: { ...comment.toObject(), userAction: 0 },
  });

  res
    .status(StatusCodes.OK)
    .json({ comment: { ...comment.toObject(), userAction: 0 } });
};

export const getAllComments = async (req: Request, res: Response) => {
  const user = req.user?.userId;

  const { episode, createdAt, parent } = req.query;
  let limit = req.query.limit as any;

  limit = Number.parseInt(limit + '') || (0 as number);

  if (!episode) throw new BadRequestError('episode not found');
  if (!createdAt || !limit) throw new BadRequestError('invalid parameters');

  let comments: (FlattenMaps<IComment> & {
    _id: Types.ObjectId;
  })[];
  if (parent) {
    comments = await Comment.find({
      episode,
      parentComment: parent,
    })
      .sort({ createdAt: 1 })
      .gt('createdAt', createdAt)
      .limit(limit + 1)
      .populate('user', ['name', 'avtPath'])
      .lean();
  } else {
    comments = await Comment.find({
      episode,
      parentComment: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .lt('createdAt', createdAt)
      .limit(limit + 1)
      .populate('user', ['name', 'avtPath'])
      .lean();
  }

  let hasMore: boolean;
  if (comments.length !== limit + 1) {
    hasMore = false;
  } else {
    hasMore = true;
    comments.pop();
  }

  if (user) {
    const commentVotes = await CommentVote.find({
      comment: { $in: comments.map((c) => c._id) },
      user: user,
    })
      .select(['-user', '-_id', '-__v'])
      .lean();

    const commentVote = commentVotes.reduce((map: any, cv) => {
      map[cv.comment.toString()] = cv.isUpvote;
      return map;
    }, {});

    comments = comments.map((c) => {
      const isUpvote = commentVote[c._id.toString()];
      return {
        ...c,
        userAction: isUpvote === undefined ? 0 : isUpvote === true ? 1 : -1,
      };
    });
  } else {
    comments = comments.map((c) => {
      return {
        ...c,
        userAction: 0,
      };
    });
  }

  res.status(StatusCodes.OK).json({ comments, hasMore });
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await Comment.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(StatusCodes.OK).json({ comment });
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Comment.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
