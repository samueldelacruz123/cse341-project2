const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students API',
        description: 'A simple API to manage students in a MongoDB database',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);