// IMPORTANT: Think of the router as the controller in NestJS

const express = require('express')

const {httpGetAllLaunches} = require ('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches)

module.exports = launchesRouter