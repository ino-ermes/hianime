import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    next();
  }
};

export default auth;
