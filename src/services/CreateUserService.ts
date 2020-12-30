import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface DTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: DTO): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists)
      throw new AppError('This email is already used by another user', 401);

    const passwordHash = await hash(password, 8);

    const newUser = userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await userRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
