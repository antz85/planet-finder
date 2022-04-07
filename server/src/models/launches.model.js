const launchesDatabase = require('./launches.mongo');
const planetsRepo = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

async function saveLaunch(launch) {
    if (!await planetExists(launch.target)) {
        throw new Error('No matching planet found');
    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function planetExists(planet) {
    return planetsRepo.findOne({
        keplerName: planet,
    });
}

async function launchExists(flightNumber) {
    return launchesDatabase.findOne({
        flightNumber: flightNumber,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber + 1;
}

function getAllLaunches() {
    return launchesDatabase
        .find({}, { '_id': 0, '__v': 0 })
        .sort('-flightNumber')
}

async function getOneLaunch(flightNumber) {
    return launchesDatabase.findOne({
        flightNumber: flightNumber,
    }, { '_id': 0, '__v': 0 });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber();
    return saveLaunch({ ...launch, flightNumber: newFlightNumber });
}

async function abortLaunch(flightNumber) {
    return launchesDatabase.updateOne({
            flightNumber: flightNumber,
        },
        {
            success: false,
            upcoming: false,
        });
}

module.exports = {
    launchExists, getAllLaunches, getOneLaunch, scheduleNewLaunch, abortLaunch,
};