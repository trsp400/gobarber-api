import 'reflect-metadata';
import dotenv from 'dotenv';
import createServer from './server';
import connectDb from './database';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const start = async (): Promise<void> => {
  try {
    connectDb().then(() => {
      createServer().listen(3333, '0.0.0.0', () => {
        console.log('🚀 server started at 3333!');
      });
    });
  } catch (error) {
    createServer().log.error(error);
  }
};

start();
