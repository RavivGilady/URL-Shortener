const dotenv = require('dotenv');
const path = require('path');
const logger = require('./logger');

// Determine path to .env file based on NODE_ENV
const envPath = getEnvFile()

logger.info(`Loading env: ${process.env.NODE_ENV}`)
dotenv.config({ path: envPath });


function getEnvFile() {
  if (process.env.NODE_ENV === 'test') {
    return path.resolve(__dirname, '../../.env.test')
  }
  if (process.env.NODE_ENV === 'development') {
    return path.resolve(__dirname, '../../.env')
  }
  if (process.env.NODE_ENV === 'production') {
    return path.resolve(__dirname, '../../env.production')
  }

}
