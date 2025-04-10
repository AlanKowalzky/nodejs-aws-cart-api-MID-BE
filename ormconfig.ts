import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
// Jeśli potrzebujesz certyfikatu CA (bezpieczniejsze rozwiązanie):
// import * as fs from 'fs'; 

dotenv.config(); // Load environment variables from .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database-1.cexgwe8kuwfo.us-east-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  // Zmień 'ssl: true' na obiekt konfiguracyjny:
  ssl: {
    rejectUnauthorized: false // <-- KLUCZOWA ZMIANA
  }
  // Bezpieczniejsza alternatywa dla produkcji (wymaga pobrania certyfikatu):
  // ssl: {
  //   rejectUnauthorized: true, // Domyślnie true, jeśli obiekt ssl istnieje
  //   ca: fs.readFileSync('/ścieżka/do/twojego/rds-combined-ca-bundle.pem').toString(), 
  // }
});

export const cli = {
  migrationsDir: 'migrations'
};
