/* eslint-disable no-useless-rename */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */
import { Sequelize } from 'sequelize-typescript';

const config = require('../config/config');

const env = require('../config/environment');

const modelsPath = `${__dirname}/models`;

const settings = {
  ...config[env.NODE_ENV],
  models: [modelsPath],
};

const database = new Sequelize(settings.url, settings);

export default database;
