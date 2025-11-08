import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Studio from '../models/Studio';
import Post from '../models/Post';

export const getStudio = async (req: Request, res: Response) => {
  const { id } = req.params;

  const studio = await Studio.findById(id);
  if (!studio) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ studio });
};

export const createStudio = async (req: Request, res: Response) => {
  const studio = await Studio.create(req.body);

  res.status(StatusCodes.OK).json({ studio });
};

export const getAllStudios = async (req: Request, res: Response) => {
  const studios = await Studio.find();

  res.status(StatusCodes.OK).json({ studios });
};

export const updateStudio = async (req: Request, res: Response) => {
  const { id } = req.params;

  const studio = await Studio.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(StatusCodes.OK).json({ studio });
};

export const deleteStudio = async (req: Request, res: Response) => {
  const { id } = req.params;

  const isExistPost = await Post.exists({ studio: id });

  if (isExistPost !== null) {
    throw new BadRequestError('this studio is used by the other post');
  }

  const result = await Studio.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
