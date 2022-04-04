// IMPORTANT: Think of the router as the controller in NestJS

const express = require('express')

const {httpGetAllPlanets} = require('./planets.controller')

const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetAllPlanets)

module.exports = planetsRouter