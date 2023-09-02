const path = require('path');
const env = process.env || {};

module.exports = {
    swaggerDefinition: {
        components: {},
        openapi: '3.0.0',
        info: {
            title: 'Monorepo NodeJS App ',
            version: '1.0.0',
            description: 'This documentation is part of a sample monorepo NodeJS app.',
        },
        "host": 'http://localhost:' + env.PORT,
    },
    apis: [path.join(__dirname, './src/**/**/*.ts')]
};

