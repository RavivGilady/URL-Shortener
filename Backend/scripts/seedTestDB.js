const dotenv = require('dotenv');
const User = require('../src/models/user');
const { hashedTestUser } = require('../tests/data/users');
const { connectDB } = require('../config/database');

dotenv.config({ path: './.env.test' });


const seedUsers = async () => {
    try {
        await User.deleteMany({}); // Clear existing users

        const user = await hashedTestUser();
        await new User(user).save();
        logger.info('Users seeded');
    } catch (error) {
        logger.error('Error seeding users:', error);
    }
};

const seedTestDB = async () => {
    await connectDB();
    await seedUsers();
};

seedTestDB();
