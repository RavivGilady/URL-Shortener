const jwt = require('jsonwebtoken');

function generateMockToken(userPayload) {
    return jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = generateMockToken;
