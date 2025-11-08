import { NextFunction, Response, Request } from 'express';
import { UnauthenticatedError } from '../errors';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') next();
  else throw new UnauthenticatedError('admin only!');
};

export default auth;
