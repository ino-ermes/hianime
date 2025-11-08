import { BadRequestError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../models/Rating';
import { Types } from 'mongoose';

export const getAverageRating = async (req: Request, res: Response) => {
  const user = req.user?.userId;

  const { post } = req.query;

  const [result] = await Rating.aggregate([
    {
      $match: { post: new Types.ObjectId(post + '') },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$score' },
      },
    },
  ]);

  if (user) {
    const myRating = await Rating.findOne({ user, post });

    const myScore = (myRating?.score || 0) as 0 | 5 | 8 | 10;

    res.status(StatusCodes.OK).json({
      averageRating: result?.averageRating || 0,
      myRating: scoreRate[myScore],
    });
  } else {
    res
      .status(StatusCodes.OK)
      .json({ averageRating: result?.averageRating || 0 });
  }
};

type RateOption = 'boring' | 'good' | 'great';
const rateScore = {
  boring: 5,
  good: 8,
  great: 10,
};

const scoreRate = {
  0: 'none',
  5: 'boring',
  8: 'good',
  10: 'great',
};

export const updateRating = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  const { rate } = req.body;

  const isValidRate = (value: any): value is RateOption =>
    ['boring', 'good', 'great'].includes(value);

  if (!isValidRate(rate)) throw new BadRequestError('kira kira hai ni natta');
  const score = rateScore[rate];

  await Rating.updateOne(
    { user, post },
    { score },
    {
      runValidators: true,
      upsert: true,
    }
  );
  res.status(StatusCodes.OK).json();
};

export const deleteRating = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;

  const result = await Rating.deleteOne({ user, post });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json();
};
