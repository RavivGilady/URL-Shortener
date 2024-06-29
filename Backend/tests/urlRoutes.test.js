const { connectDB, disconnectDB, dropTable } = require('../src/config/database');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const URL = require('../src/models/url');
const { testUser } = require('./data/users');
const logger = require('../src/config/logger')
beforeAll(async () => {
    logger.info("before all urlRoutes");
   await connectDB();
    await User.deleteMany();
    await URL.deleteMany();
    await new User(testUser).save();
});

afterAll(async () => {
    // await  dropTable();
    await disconnectDB();
});

beforeEach(async () => {
    logger.info("before TEST urlRoutes");

    await URL.deleteMany();
});

test('should shorten a URL', async () => {
    const response = await request(app)
        .post('/shorten')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)

        .send({
            originalUrl: 'http://example.com'
        })
        .expect(201);

    expect(response.body).toHaveProperty('shortUrl');
});

test('should get all URLs for the user', async () => {
    await new URL({
        originalUrl: 'http://example.com',
        shortUrl: 'abc123',
        userId: testUser._id
    }).save();

    const response = await request(app)
        .get('/urls')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].originalUrl).toBe('http://example.com');
});
