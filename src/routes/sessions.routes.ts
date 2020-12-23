import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import AuthenticateUserService from '../services/AuthenticateUserService';

type CustomRequest = FastifyRequest<{
  Body: { email: string; password: string };
}>;

export default async function sessionRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  next: HookHandlerDoneFunction,
) {
  server.post(`/`, async (req: CustomRequest, res: FastifyReply) => {
    try {
      const { email, password } = req.body;

      const authenticateUser = new AuthenticateUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      return { user, token };
    } catch (error) {
      return res.status(403).send({
        message: error.message,
      });
    }
  });

  next();
}
