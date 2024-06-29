module.exports = {
    setupFiles: ['./tests/setupTests.js'],  // Setup file to load environment variables
    testEnvironment: 'node',               // Use Node environment for testing
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these paths
    testMatch: ['**/tests/**/*.test.js'],  // Match test files in tests directory
    collectCoverage: true,                 // Enable coverage collection
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',               // Collect coverage from source files
        '!src/**/index.js',                // Exclude index files
        '!src/**/*.{test,spec}.{js,jsx}'   // Exclude test files
    ],
    coverageDirectory: './coverage',       // Output directory for coverage reports
};