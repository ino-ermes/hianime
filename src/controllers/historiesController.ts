import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import History from '../models/History';
import Episode from '../models/Episode';
import { Types } from 'mongoose';

export const getHistory = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;

  if (post) {
    const history = await History.findOne({ user, post });
    if (history) {
      res.status(StatusCodes.OK).json({
        history: { episode: history.episode, position: history.position },
      });
    } else {
      res.status(StatusCodes.OK).json({
        history: null,
      });
    }
  } else {

    const histories = await History.aggregate([
      { $match: { user: new Types.ObjectId(user) } },
      { $sort: { updatedAt: -1 } },
      {
        $lookup: {
          from: 'posts',
          localField: 'post',
          foreignField: '_id',
          as: 'post',
        },
      },
      { $unwind: '$post' },
      {
        $lookup: {
          from: 'episodes',
          let: { post: '$post._id' },
          pipeline: [
            {
              $match: {
                releaseDate: { $lte: new Date() },
                $expr: { $eq: ['$post', '$$post'] },
              },
            },
            {
              $group: {
                _id: '$post',
                count: { $sum: 1 },
              },
            },
          ],
          as: 'episodeCount',
        },
      },
      { $unwind: { path: '$episodeCount', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          'post.episodeCount': { $ifNull: ['$episodeCount.count', 0] },
        },
      },
      { $unset: ['user', 'episodeCount'] },
      {
        $project: {
          'post.posterHorizonPath': 0,
          'post.description': 0,
          'post.airedFrom': 0,
          'post.airedTo': 0,
          'post.status': 0,
          'post.studio': 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);

    await Episode.populate(histories, {
      path: 'episode',
      select: ['episodeNumber', 'duration'],
    });

    res.status(StatusCodes.OK).json({ histories });
  }
};

export const updateHistory = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;

  const { episode, position } = req.body;

  if (!post) throw new BadRequestError('missng post');

  await History.updateOne(
    { user, post },
    { user, post, episode, position },
    { upsert: true }
  );

  res.status(StatusCodes.OK).json();
};

export const deleteHistory = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  if (!post) throw new BadRequestError('missng post');

  const result = await History.deleteOne({ user, post });

  if (result.deletedCount <= 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
