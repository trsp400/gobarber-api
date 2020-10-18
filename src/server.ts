import fastify from 'fastify';

const server = fastify();

const start = async (): Promise<void> => {
  try {
    server.listen(3333, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
  }
}
server.get(`/`, async (request, response) => {
  return {
    message: 'oewsdadaawdawiss'
  }
})

start();

