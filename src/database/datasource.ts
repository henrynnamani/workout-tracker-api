import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const datasource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: process.env.DB_SYNC === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
