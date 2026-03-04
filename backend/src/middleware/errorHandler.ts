import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('❌ Error:', err.message);
  const statusCode = err.message.includes('not found') ? 404
    : err.message.includes('Unauthorized') ? 403
    : err.message.includes('Invalid credentials') || err.message.includes('already registered') ? 400
    : 500;

  res.status(statusCode).json({ success: false, message: err.message });
};

export const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({ success: false, message: 'Route not found' });
};
