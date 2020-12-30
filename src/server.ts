import fastify from 'fastify';
import plugins from './configs/registerPlugins';

export default async function createServer() {
  const server = fastify();

  server.register(plugins);

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.send({ error });
  });

  return server;
}
