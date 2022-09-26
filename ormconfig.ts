import { DataSourceOptions, DataSource } from 'typeorm';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';
const pathDataBase = 'dist/src/database';

export const config: DataSourceOptions = {
  ssl: isProduction,
  extra: {
    ssl: isProduction
      ? {
          rejectUnauthorized: false,
        }
      : false,
  },
  type: 'postgres',
  port:  +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  migrationsTableName: 'migrations_table',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`${pathDataBase}/migrations/*{.ts,.js}`],
  subscribers: [`${pathDataBase}/subscribers/*{.ts,.js}`],
  synchronize: false,
};

const dataSource = new DataSource(config);

export default dataSource;
