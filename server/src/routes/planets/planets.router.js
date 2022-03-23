// IMPORTANT: Think of the router as the controller in NestJS

const express = require('express')

const {getAllPlanets} = require('./planets.controller')

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets)

module.exports = planetsRouter