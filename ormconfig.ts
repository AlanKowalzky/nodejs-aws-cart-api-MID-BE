import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database-1.cexgwe8kuwfo.us-east-1.rds.amazonaws.com',
  port: 5432,
  username: 'your_username',  // Replace with your actual username
  password: process.env.DB_PASSWORD,
  database: 'your_database', // Replace with your actual database name
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
});

export const cli = {
  migrationsDir: 'migrations'
};