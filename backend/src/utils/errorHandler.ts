import { Request, Response, NextFunction } from 'express';

type StatusError = Error & { status?: number; details?: any };

export const errorHandler = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status && typeof err.status === 'number' ? err.status : 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    details: err.details ?? null,
  });
};
