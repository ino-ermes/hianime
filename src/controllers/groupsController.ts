import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group';
import { Types } from 'mongoose';

export const createGroup = async (req: Request, res: Response) => {
  const group = await Group.create(req.body);

  res.status(StatusCodes.OK).json({ group });
};

export const updateGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await Group.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ group });
};

export const getGroup = async (req: Request, res: Response) => {
  const { id } = req.params;

  const group = (
    await Group.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'group',
          as: 'posts',
        },
      },
      {
        $sort: {
          airedFrom: 1,
        },
      },
    ])
  )[0];

  res.status(StatusCodes.OK).json({ group });
};

export const getAllGroups = async (req: Request, res: Response) => {
  const groups = await Group.find();

  res.status(StatusCodes.OK).json({ groups });
};

export const deleteGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Group.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
