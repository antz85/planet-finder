// IMPORTANT: Think of the router as the controller in NestJS

const express = require('express')

const {httpGetAllLaunches, httpCreateLaunch, httpGetOneLaunch} = require ('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/:flightNumber', httpGetOneLaunch)
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpCreateLaunch)

module.exports = launchesRouter