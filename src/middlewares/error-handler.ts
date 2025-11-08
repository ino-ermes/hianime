import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import { CustomAPIError } from '../errors';

const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'here there and everywhere',
  };

  if (error instanceof Error.ValidationError) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(error.errors)
      .map((value) => value.message)
      .join(', ');
  }

  if (error instanceof CustomAPIError) {
    defaultError.statusCode = error.statusCode;
    defaultError.msg = error.message;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
