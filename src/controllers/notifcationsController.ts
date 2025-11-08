import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Notification from '../models/Notification';

export const getNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);
  if (!notification) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ notification });
};

export const getAllNotifications = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const notifications = await Notification.find({ user }).sort('createdAt');

  res.status(StatusCodes.OK).json({ notifications });
};

export const deleteAllNotifications = async (req: Request, res: Response) => {
    const user = req.user.userId;
  
    await Notification.deleteMany({ user });
  
    res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
  };

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Notification.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
