/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv-extended');
const { resolve } = require('path');

const envName = process.env.NODE_ENV
  ? process.env.NODE_ENV.toLowerCase()
  : 'dev';
const isTest = envName === 'test';
const path = resolve(__dirname, `../../env/.env.${envName}`);

// load relevant .env file
dotenv.load({
  path,
  silent: true,
  defaults: resolve(__dirname, '../../env/.env'),
  schema: resolve(__dirname, '../../env/.env.sample'),
  errorOnMissing: !isTest,
  errorOnExtra: false,
  errorOnRegex: false,
  includeProcessEnv: true,
  overrideProcessEnv: true,
});

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';

const environment = {
  ...process.env,
  isDevelopment,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
};

module.exports = environment;
