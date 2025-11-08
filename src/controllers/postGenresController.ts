import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostGenre from '../models/PostGenre';

export const createPostGenre = async (req: Request, res: Response) => {
  const postGenre = await PostGenre.create(req.body);

  res.status(StatusCodes.OK).json({ postGenre });
};

export const deletePostGenre = async (req: Request, res: Response) => {
  const { post, genre } = req.query;

  const result = await PostGenre.deleteOne({ post, genre });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
