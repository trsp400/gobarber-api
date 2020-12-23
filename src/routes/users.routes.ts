import {
  FastifyRequest,
  FastifyInstance,
  RouteShorthandOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import CreateUserService from '../services/CreaateUserService';

type CustomRequest = FastifyRequest<{
  Body: { name: string; email: string; password: string };
}>;

export default async function usersRoutes(
  server: FastifyInstance,
  options: RouteShorthandOptions,
  next: HookHandlerDoneFunction,
) {
  server.post(`/`, async (req: CustomRequest, res) => {
    try {
      const { name, email, password } = req.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return user;
    } catch (error) {
      return res.status(403).send({
        message: error.message,
      });
    }
  });

  next();
}
