/**
 * 
 * All configuration of the database it's here 
 * 
 */
import { Pool, types } from 'pg';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import logger from '../utils/logger';

/**
 * -------------------------------
 *
 *
 * ENV
 *
 *
 * -------------------------------
 * * */
const nodeEnv = process.env.NODE_ENV;
const file = path.join(__dirname, '../../env', `.env.${nodeEnv}`);

// Load env vars
const envConfig = dotenv.parse(fs.readFileSync(file));
const addKey = () => {
  Object.keys(envConfig).forEach((key) => {
    if (key) {
      process.env[key] = envConfig[key];
    }
  });
};
addKey();

/**
 * configuração do dotenv
 */
dotenv.config();

/**
 * Bigint columns not return as strings
 */
types.setTypeParser(20, 'text', parseInt);

/**
 * Numeric columns not return as strings
 */
types.setTypeParser(1700, 'text', parseFloat);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000
});

logger.info(`Trying to connect: [${pool.options.host}:${pool.options.port}] ...`);

pool.query('select 1', (err) => {
  if (err) {
    logger.error('Database connection could not be established.');
    if (process.env.NODE_ENV !== 'test') process.exit(0);
  } else {
    logger.info('Database connection was established successfully');
  }
});

process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      logger.info(err);
    } else {
      logger.info('Database connection was CLOSED');
    }

    if (process.env.NODE_ENV !== 'test') process.exit(0);
  });
});

export default pool;
