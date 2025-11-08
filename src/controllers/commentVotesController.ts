import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentVote from '../models/CommentVote';
import Comment from '../models/Comment';
import commentQueue from '../queues/comment-queue';

export const createCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { comment } = req.query;
  const { isUpvote } = req.body;

  const prevVote = await CommentVote.findOneAndUpdate(
    { user, comment },
    { isUpvote },
    {
      runValidators: true,
      upsert: true,
    }
  );

  const voteCounts = {} as any;
  if (prevVote && prevVote.isUpvote === true) {
    if (!isUpvote) {
      voteCounts.upvote = -1;
      voteCounts.devote = 1;
    }
  } else if (prevVote && prevVote.isUpvote === false) {
    if (isUpvote) {
      voteCounts.upvote = 1;
      voteCounts.devote = -1;
    }
  } else {
    if (isUpvote) {
      voteCounts.upvote = 1;
    } else {
      voteCounts.devote = 1;
    }
  }

  await Comment.updateOne({ _id: comment }, { $inc: voteCounts });

  const commentId = comment as string;
  commentQueue.add(commentId, {
    action: 'vote',
    commentId,
    userAction: isUpvote ? 1 : -1,
  });

  res.status(StatusCodes.OK).json({});
};

export const deleteCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { comment } = req.query;

  const prevVote = await CommentVote.findOneAndDelete({ user, comment });

  if (prevVote && prevVote.isUpvote) {
    await Comment.updateOne({ _id: comment }, { $inc: { upvote: -1 } });
  } else if (prevVote) {
    await Comment.updateOne({ _id: comment }, { $inc: { devote: -1 } });
  } else {
    throw new BadRequestError('making each day of the year');
  }

  const commentId = comment as string;
  commentQueue.add(commentId, {
    action: 'vote',
    commentId,
    userAction: 0,
  });

  res.status(StatusCodes.OK).json({});
};
