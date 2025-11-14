const express = require('express');
const mongodb = require('./data/database');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 3000;


// Middleware
app.use(bodyParser.json());

// Swagger setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', require('./routes'));

// Database
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
  }
});