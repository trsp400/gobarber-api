import CreateUserService from '../services/CreaateUserService';

export default async function usersRoutes(server, options, next) {
  server.post(`/`, async (req: any, res: any) => {
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
