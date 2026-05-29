import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from './app-error.js';

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  request.log.error({ err: error }, 'Request error');

  if (error instanceof AppError) {
    void reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  if (error instanceof ZodError) {
    void reply.status(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.flatten(),
      },
    });
    return;
  }

  const statusCode = 'statusCode' in error && typeof error.statusCode === 'number'
    ? error.statusCode
    : 500;

  void reply.status(statusCode).send({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: statusCode >= 500 ? 'Internal server error' : error.message,
    },
  });
}
