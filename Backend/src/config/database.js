const mongoose = require('mongoose');
const logger = require('../config/logger');


let connection = null;

const dbURI = getDatabaseURI();
logger.debug(`db uri: ${dbURI}`)
async function connectDB () {

    if (connection) return connection;
    options = getOptions();
    connection = mongoose.connect(dbURI, options).then((conn) => {
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

function getDatabaseURI(){
    if(process.env.NODE_ENV === 'test'){
        logger.info("Using Test Database URI")
        return process.env.TEST_DB_URI;
    }
    if(process.env.NODE_ENV === 'development'){
        logger.info("Using development Database URI")
        return process.env.DEVELOPMENT_DB_URI;
    }
    if(process.env.NODE_ENV === 'production'){
        logger.info("Using Production Database URI")
        return process.env.PRODUCTION_DB_URI;
    }
}
function getOptions(){
    if(typeof process.env.FIXIE_SOCKS_HOST != "undefined"){
        var fixieData = process.env.FIXIE_SOCKS_HOST.split(new RegExp('[/(:\\/@/]+'));

        return ({
            proxyUsername: fixieData[0],
            proxyPassword: fixieData[1],
            proxyHost: fixieData[2],
            proxyPort: fixieData[3]
           });     
    }
    else 
    return ({});
}
module.exports = { connectDB, disconnectDB, dropTable };
