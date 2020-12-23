import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

import values from '../configs/values';

interface DTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: DTO): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error('User not found');

    const isPasswordCorret = await compare(password, user.password);

    if (!isPasswordCorret) throw new Error('Incorrect password!');

    const { secret } = values.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: '7d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
