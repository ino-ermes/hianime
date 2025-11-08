import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response) => {
  const page = toNumber(req.query.page, 1);
  const limit = toNumber(req.query.limit, 10);

  const users = await User.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select(['name', 'email', 'role', 'createdAt']);

  const totalPages = Math.ceil((await User.countDocuments()) / limit);

  res.status(StatusCodes.OK).json({ users, page, totalPages });
};

const toNumber = (input: any, d: number) => {
  return Number.parseInt(input) || d;
};

export const resetPassword = async (req: Request, res: Response) => {
  const { user } = req.params;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('12345678', salt);

  const result = await User.updateOne(
    { _id: user, role: 'user' },
    { password }
  );

  if (result.modifiedCount !== 1)
    throw new NotFoundError(
      "user not found(or maybe you're trying to reset admin's password)"
    );

  res.status(StatusCodes.OK).json();
};
