const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// MIDDLEWARE
app.use(express.json());

// ACCESSING STATIC FILES IN PUBLIC FOLDER
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// For use in server.js
module.exports = app;
