import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalogs';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  console.error(err, 'lugar errado');
  return res.status(500).json({ message: 'Internal Error' });
};

export default errorHandler;