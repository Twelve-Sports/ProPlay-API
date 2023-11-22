import dotenv from 'dotenv';

dotenv.config();

export const development = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: '3306',
    user: 'lobatoSQL',
    password: '1234',
    database: 'gravacoes',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

