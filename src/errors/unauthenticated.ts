import CustomAPIError from './custom-api.js';
import { StatusCodes } from 'http-status-codes';

class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export default UnauthenticatedError;