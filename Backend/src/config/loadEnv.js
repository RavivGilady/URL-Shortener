const dotenv = require('dotenv');
const path = require('path');
const logger = require('./logger');

// Determine path to .env file based on NODE_ENV
const envPath = process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, '../../.env.test')
  : path.resolve(__dirname, '../../.env');
  logger.info(`Loading env: ${process.env.NODE_ENV=== 'test'? 'test' : 'development'}`)
  dotenv.config({ path: envPath });

