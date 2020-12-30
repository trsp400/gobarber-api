import fastify from 'fastify';
import dotenv from 'dotenv';
import plugins from './configs/registerPlugins';
import errorHandler from './configs/errorHandler';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default async function createServer() {
  const server = fastify();

  server.register(plugins);

  server.setErrorHandler(errorHandler);

  return server;
}
