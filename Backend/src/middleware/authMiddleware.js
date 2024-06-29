const jwt = require('jsonwebtoken');
    const logger = require('../config/logger');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
         next();
    } catch (error) {
        logger.error(`Error was thrown to verify token:${error}`)
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
