import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';
import { NextFunction, Response, RequestHandler, Request } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('making each day of the year');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthenticatedError('making each day of the year');
  }

  try {
    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      'to live a better life, i need my love to be here'
    );
  }
};

export default auth;
