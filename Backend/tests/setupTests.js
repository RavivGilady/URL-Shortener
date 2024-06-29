const path = require('path');
const dotenv = require('dotenv');
const logger = require('../src/config/logger');

// Explicitly load .env.test
const envPath = path.resolve(__dirname, '../.env.test');
dotenv.config({ path: envPath });
// Optionally, you can log to verify
logger.debug('Environment variables loaded from .env.test');