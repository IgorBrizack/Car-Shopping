import { NextFunction, Request, Response } from 'express';
import ErrorWithStatus from '../helpers/ErrorWithStatus';

class ErrorHandler {
  public static handle(
    error: ErrorWithStatus,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;