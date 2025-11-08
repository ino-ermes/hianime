import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export default BadRequestError;