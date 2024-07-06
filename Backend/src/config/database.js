const mongoose = require('mongoose');
const logger = require('../config/logger');

let connection = null;

const dbURI = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.DB_URI;
logger.debug(`db uri: ${dbURI}`)
async function connectDB () {

    if (connection) return connection;
    connection = mongoose.connect(dbURI, {
    }).then((conn) => {
        logger.info(`MongoDB Connected to ${process.env.NODE_ENV} Database`);
        return conn;
    }).catch((error) => {
        logger.error(`MongoDB connection to ${process.env.NODE_ENV} error:', ${error}`);
        process.exit(1);
    });
    return connection;

    
};


async function disconnectDB() {
    if (connection) {
        await mongoose.disconnect();
        logger.info('MongoDB disconnected');
        connection = null;
    }
}
async function dropTable() {
    if (connection) {
        await mongoose.connection.dropCollection;
        logger.info('MongoDB dropped table');
    }
}
module.exports = { connectDB, disconnectDB, dropTable };
