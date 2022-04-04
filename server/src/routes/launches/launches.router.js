// IMPORTANT: Think of the router as the controller in NestJS

const express = require('express')

const {
    httpGetAllLaunches,
    httpCreateLaunch,
    httpGetOneLaunch,
    httpAbortLaunch,
} = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/:flightNumber', httpGetOneLaunch)
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpCreateLaunch)
launchesRouter.delete('/:flightNumber', httpAbortLaunch)

module.exports = launchesRouter