// import dotenv from 'dotenv';

// dotenv.config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

export default {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'gobarber',
  password: 'gobarber',
  database: 'gobarber',
  synchronize: true,
  logging: false,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/models/*.ts'],
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './src/database/migrations',
  },
};
