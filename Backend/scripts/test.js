console.log("test.js")
process.env.NODE_ENV = 'test';
const jest = require('jest');
jest.run();
