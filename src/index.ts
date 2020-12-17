import 'reflect-metadata';
import createServer from './server';
import connectDb from './database';

const server = createServer();

const start = async (): Promise<void> => {
  try {
    await connectDb();

    server.listen(3333, '0.0.0.0', () => {
      console.log('🚀 server started at 3333!');
    });
  } catch (error) {
    server.log.error(error);
  }
};

start();
