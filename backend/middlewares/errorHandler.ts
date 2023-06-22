import { Request, Response, NextFunction } from "express";

export interface ErrnoException extends Error {
  stack?: string;
  statusCode?: number;
  kind?: string;
}

const errorHandler = (
  err: ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🍮" : err.stack, // only show stack in development mode
  });
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as ErrnoException;
  error.statusCode = 404;
  next(error);
};

export { errorHandler, notFound };
