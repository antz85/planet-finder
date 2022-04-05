const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function launchExists(flightNumber) {
    return launches.has(flightNumber);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function getOneLaunch(flightNumber) {
    return launches.get(flightNumber);
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        {
            ...launch,
            flightNumber: latestFlightNumber,
            customers: ['ZTM', 'NASA'],
            upcoming: true,
            success: true,
        },
    );
}

function abortLaunch(flightNumber) {
    const abortedLaunch = launches.get(flightNumber);
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;
    return abortedLaunch;
}

module.exports = {
    launchExists,
    getAllLaunches,
    getOneLaunch,
    addNewLaunch,
    abortLaunch,
};