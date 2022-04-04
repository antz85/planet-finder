// IMPORTANT: Think of the router as the controller in NestJS

const express = require('express')

const {getAllLaunches} = require ('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches)

module.exports = launchesRouter