import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { verify } from 'jsonwebtoken';
import values from '../configs/values';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function verifyAuthentication(
  request: FastifyRequest,
  response: FastifyReply,
  next: HookHandlerDoneFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(403).send({ error: 'Missing JWT yoken' });

  const [, token] = authHeader.split(' ');

  const { secret } = values.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    return response.status(403).send({
      error: 'Invalid JWT token',
    });
  }
}
