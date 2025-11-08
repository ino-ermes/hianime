import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Genre from '../models/Genre';
import PostGenre from '../models/PostGenre';

export const getGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ genre });
};

export const createGenre = async (req: Request, res: Response) => {
  const genre = await Genre.create(req.body);

  res.status(StatusCodes.OK).json({ genre });
};

export const getAllGenres = async (req: Request, res: Response) => {
  const genres = await Genre.find();

  res.status(StatusCodes.OK).json({ genres });
};

export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(StatusCodes.OK).json({ genre });
};

export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Genre.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');

  await PostGenre.deleteMany({ genre: id });

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
