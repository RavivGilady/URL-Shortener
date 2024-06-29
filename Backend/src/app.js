require('./config/loadEnv'); // Load environment variables

const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger');


const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware   
app.use(express.json());

// Routes
app.use('/', urlRoutes);
app.use('/auth', authRoutes);

connectDB();

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });

    
}

module.exports = app;