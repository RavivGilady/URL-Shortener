const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const testUserId = new mongoose.Types.ObjectId();
const testUser = {
    _id: testUserId,
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123', // Plain text password for seeding, hashed in the seeding script
    tokens: [{ token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET, { expiresIn: '1h' }) }]
};

const hashedTestUser = async () => {    
    return {
        ...testUser,
        password: await bcrypt.hash(testUser.password, 10), // Hash password for seeding
    };
};

module.exports = {
    testUser,
    hashedTestUser
};
