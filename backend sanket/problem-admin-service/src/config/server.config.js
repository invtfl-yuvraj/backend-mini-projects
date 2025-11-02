import dotenv from 'dotenv';

dotenv.config({quiet: true});

const SERVER_CONFIG = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URL: process.env.MONGODB_URL,
};

export default SERVER_CONFIG;

