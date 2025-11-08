import { BadRequestError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Favorite from '../models/Favorite';
import { Types } from 'mongoose';

export const createFavorite = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  if (!post) throw new BadRequestError('post is missing');

  const { list } = req.body;

  await Favorite.updateOne({ user, post }, { list }, { upsert: true });

  res.status(StatusCodes.OK).json();
};

export const getFavorite = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  if (!post) throw new BadRequestError('post is missing');

  const favorite = await Favorite.findOne({ user, post });

  res.status(StatusCodes.OK).json({ list: favorite?.list || 'none' });
};

export const getAllFavorites = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const list = req.query.list;

  const favorites = await Favorite.aggregate([
    { $match: { user: new Types.ObjectId(user), list } },
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
    {
      $replaceRoot: { newRoot: '$post' },
    },
    {
      $project: {
        posterHorizonPath: 0,
        description: 0,
        airedFrom: 0,
        airedTo: 0,
        status: 0,
        studio: 0,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ favorites });
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  if (!post) throw new BadRequestError('post is missing');

  const result = await Favorite.deleteOne({ user, post });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json();
};
