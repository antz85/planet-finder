const axios = require('axios');

const launchesDatabase = require('./launches.mongo');
const planetsRepo = require('./planets.mongo');
const launchDataRepo = require('./launchDownloadDates.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

function spacexLaunch(flightNumber, mission, rocket, launchDate, customers, upcoming, success) {
    return {
        flightNumber, //SpaceX data -> flight_number
        mission, //SpaceX data -> name
        rocket, //SpaceX data -> rocket.name
        launchDate, //SpaceX data -> date_local
        customers, //SpaceX data -> payloads.customers for each payload
        upcoming, //SpaceX data -> upcoming
        success, //SpaceX data -> success
    };
}

async function saveLaunch(launch) {
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
    return launchesDatabase.findOne({ flightNumber });
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

function getAllLaunches(skip, limit) {
    return launchesDatabase
        .find({}, { '_id': 0, '__v': 0 })
        .sort('-flightNumber')
        .skip(skip)
        .limit(limit);
}

async function getOneLaunch(flightNumber) {
    return launchesDatabase.findOne({
        flightNumber: flightNumber,
    }, { '_id': 0, '__v': 0 });
}

async function scheduleNewLaunch(launch) {
    if (!await planetExists(launch.target)) {
        throw new Error('No matching planet found');
    }
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

async function populateLaunches() {
    console.log("Downloading launch data...");
    const response = await axios.post(SPACEX_API_URL, {
        "options": {
            "pagination": false,
            "populate": [
                {
                    "path": "rocket",
                    "select": {
                        "name": 1,
                    },
                },
                {
                    "path": "payloads",
                    "select": {
                        "customers": 1,
                    },
                },
            ],
        },
    });
    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }
    const launchDocs = response.data.docs;

    for (const launchDoc of launchDocs) {
        const customers = launchDoc.payloads.flatMap(payload => payload.customers);
        const launch = spacexLaunch(
            launchDoc.flight_number,
            launchDoc.name,
            launchDoc.rocket.name,
            launchDoc.date_local,
            customers,
            launchDoc.upcoming,
            launchDoc.success,
        );
        await saveLaunch(launch);
    }
}

async function loadLaunchData() {
    const today = new Date();
    const launchesDownloadDate = {
        month: today.toLocaleString('default', { month: "long" }),
        year: today.getFullYear(),
    };
    const findDate = await launchDataRepo.findOne(launchesDownloadDate);
    if (!findDate) {
        await populateLaunches();
        await launchDataRepo.updateOne(launchesDownloadDate, launchesDownloadDate, { upsert: true });
    }
}


module.exports = {
    launchExists,
    getAllLaunches,
    getOneLaunch,
    scheduleNewLaunch,
    abortLaunch,
    loadLaunchData,
};