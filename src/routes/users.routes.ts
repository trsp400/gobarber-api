import {
  FastifyRequest,
  FastifyInstance,
  RouteShorthandOptions,
  HookHandlerDoneFunction,
  FastifyReply,
} from 'fastify';

import multer from 'fastify-multer';
import uploadConfig from '../configs/upload';

import verifyAuthenticationMiddleware from '../middlewares/verifyAuthentication';
import CreateUserService from '../services/CreaateUserService';

type CustomRequest = FastifyRequest<{
  Body: { name: string; email: string; password: string };
}>;

const upload = multer(uploadConfig);

export default async function usersRoutes(
  server: FastifyInstance,
  options: RouteShorthandOptions,
  next: HookHandlerDoneFunction,
) {
  server.post(
    `/`,
    { preValidation: [verifyAuthenticationMiddleware] },
    async (request: CustomRequest, reply: FastifyReply) => {
      try {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
          name,
          email,
          password,
        });

        delete user.password;

        next();
        return reply.status(200).send(user);
      } catch (error) {
        return reply.status(403).send({
          message: error.message,
        });
      }
    },
  );

  server.patch(
    '/avatar',
    {
      preValidation: [verifyAuthenticationMiddleware, upload.single('avatar')],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({
        oie: 'ok',
      });
    },
  );
}
