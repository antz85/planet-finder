// npm imports
const express = require('express')
const cors = require('cors')

// local imports
const planetsRouter = require('./routes/planets/planets.router')

// use express
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(planetsRouter);


module.exports = app