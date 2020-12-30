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
import CreateUserService from '../services/CreateUserService';
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
  });

  server.patch(
    '/avatar',
    {
      preValidation: [verifyAuthenticationMiddleware, upload.single('avatar')],
    },
    async (request: PatchCustomRequest, reply: FastifyReply) => {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return reply.send(user);
    },
  );
}
