import createServer from './server';

const server = createServer();

const start = async (): Promise<void> => {
  try {
    server.listen(3333, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
  }
}

start();
