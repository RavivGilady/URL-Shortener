const crypto = require('crypto');

const generateShortId = () => {
    return crypto.randomBytes(4).toString('hex');
};

module.exports = generateShortId;