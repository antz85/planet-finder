const path = require("path");

// npm imports
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// local imports
const planetsRouter = require('./routes/planets/planets.router')

// use express
const app = express();

// MIDDLEWARE
// cross-origin-requests: fetch data from another ip address
app.use(cors({
    origin: 'http://localhost:3000'
}));

// morgan
app.use(morgan('combined'))

// This is to be able to send json objects to POST methods
app.use(express.json());

// Create a 'public' folder for files you want to make available from your server
// USE NODE TO SERVE A FRONTEND WEB APP by using 'express.static()' middleware (first argument is the path you want to use)
app.use(express.static(path.join(__dirname, '..', 'public')))

// Mount the routers onto your application
app.use(planetsRouter);

// Send index.html to the path in the first argument
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app