// npm imports
const express = require('express')

const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

// create router
const api = express.Router();

// Mount routers
api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

module.exports = api;