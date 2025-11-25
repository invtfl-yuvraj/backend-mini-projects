import dotenv from 'dotenv';

dotenv.config({quiet: true});

const SERVER_CONFIG = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URL: process.env.MONGODB_URL,
  LOG_DB_URI: process.env.LOG_DB_URI,
};

export const { LOG_DB_URI } = SERVER_CONFIG;

export default SERVER_CONFIG;

