/* eslint-disable @typescript-eslint/no-var-requires */
const env = require('./environment.js');

const appEnvironment = env.NODE_ENV;

// database configs
const config = {
  [appEnvironment]: {
    url: env.DATABASE_URL,
    dialect: env.DATABASE_DIALECT || 'postgres',
    logging: false,
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
  },
};

module.exports = config;
