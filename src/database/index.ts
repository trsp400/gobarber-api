import { createConnection } from 'typeorm';

const connectDb = async () => {
  let retries = 3;
  while (retries) {
    try {
      await createConnection();
      break;
    } catch (err) {
      retries -= 1;
      await new Promise(res => setTimeout(res, 500));
    }
  }
};

export default connectDb;
