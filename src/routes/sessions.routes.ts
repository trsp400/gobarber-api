import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  HookHandlerDoneFunction,
  RouteShorthandOptions,
} from 'fastify';
import AuthenticateUserService from '../services/AuthenticateUserService';

type CustomRequest = FastifyRequest<{
  Body: { email: string; password: string };
}>;

export default async function sessionRoutes(
  server: FastifyInstance,
  options: RouteShorthandOptions,
  next: HookHandlerDoneFunction,
) {
  server.post(`/`, async (request: CustomRequest, reply: FastifyReply) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return reply.status(200).send({ user, token });
  });

  next();
}
