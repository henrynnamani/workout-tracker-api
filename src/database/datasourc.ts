import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNC === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
