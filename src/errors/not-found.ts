import CustomAPIError from './custom-api.js';
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export default NotFoundError;
