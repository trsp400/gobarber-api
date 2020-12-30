/* eslint-disable global-require */
import fastify from 'fastify';
import multer from 'fastify-multer';
import path from 'path';

export default async function createServer() {
  const server = fastify();

  server.register(require('fastify-cors'));
  await server.register(require('middie'));
  server.register(multer.contentParser);
  server.register(require('fastify-static'), {
    root: path.join(__dirname, '..', 'temp'),
    prefix: '/public',
  });

  server.register(require('fastify-oas'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'GoBarber 13',
        description: 'GoBarber Documentation.',
        version: '0.1',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });

  server.register(require('./routes'));

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.send({ error });
  });

  return server;
}
