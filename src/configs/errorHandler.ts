import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import AppError from '../errors/AppError';

export default (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (process.env.NODE_ENV === 'development') {
    request.log.error(error.toString());

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({
      message: 'Internal Server Error',
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
  });
};
