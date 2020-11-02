import fastify from 'fastify';
import './database';

export default function createServer() {
  const server = fastify();

  server.register(require('fastify-cors'));

  server.register(require('fastify-oas'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'GoBarber 13',
        description: "GoBarber 13 Documentation. That's a different version of GoBarber, made with fastify intead of Express.",
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true
  })

  server.register(require('./routes'));

  server.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

  return server;
}