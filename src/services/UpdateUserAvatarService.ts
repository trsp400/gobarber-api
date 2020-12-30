import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../configs/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change the avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const uesrAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (uesrAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
