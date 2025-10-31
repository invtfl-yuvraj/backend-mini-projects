import dotenv from 'dotenv';

dotenv.config({quiet: true});

const serverConfig = {
  PORT: process.env.PORT || 8080,
};

export const { PORT } = serverConfig;