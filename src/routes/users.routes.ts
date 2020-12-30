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
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

type PostCustomRequest = FastifyRequest<{
  Body: { name: string; email: string; password: string };
}>;

interface PatchCustomRequest extends FastifyRequest {
  user: { id: string };
  file: { filename: string };
}

const upload = multer(uploadConfig);

export default async function usersRoutes(
  server: FastifyInstance,
  options: RouteShorthandOptions,
  next: HookHandlerDoneFunction,
) {
  server.post(`/`, async (request: PostCustomRequest, reply: FastifyReply) => {
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
  });

  server.patch(
    '/avatar',
    {
      preValidation: [verifyAuthenticationMiddleware, upload.single('avatar')],
    },
    async (request: PatchCustomRequest, reply: FastifyReply) => {
      try {
        const updateUserAvatarService = new UpdateUserAvatarService();

        const user = await updateUserAvatarService.execute({
          user_id: request.user.id,
          avatarFilename: request.file.filename,
        });

        return reply.send(user);
      } catch (error) {
        return reply.status(400).send({
          error: error.message,
        });
      }
    },
  );
}
