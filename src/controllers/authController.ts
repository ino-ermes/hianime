import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('some field is not provided');

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new UnauthenticatedError('email is incorrect');

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError('password is incorrect');

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.user!.userId, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ user });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.userId);
  res.status(StatusCodes.OK).json({ user });
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const imageUrl = (req.file as any).path;

  await User.updateOne(
    { _id: user },
    {
      avtPath: imageUrl,
    }
  );

  res.status(StatusCodes.OK).json({ avtPath: imageUrl });
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const { password, newPassword } = req.body;

  if (typeof password !== 'string' || typeof newPassword !== 'string')
    throw new BadRequestError('unknow error');

  if (password.length < 8 || newPassword.length < 8)
    throw new BadRequestError(
      'length of password must be longer than 8 characters'
    );

  const user = await User.findOne({ _id: userId }).select('+password');

  if (!user) throw new UnauthenticatedError('and i love her');

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError('password is incorrect');

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);

  const result = await user.updateOne({
    password: hashed,
  });

  if (result.modifiedCount !== 1) throw Error("what's up");

  res.status(StatusCodes.OK).json();
};

export const updateSetting = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { autoPlay, autoNext } = req.body;

  await User.updateOne(
    { _id: user },
    {
      setting: {
        autoNext,
        autoPlay,
      },
    }
  );

  res.status(StatusCodes.OK).json();
};
