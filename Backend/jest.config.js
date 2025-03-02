module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/setup.js'
    ]
};