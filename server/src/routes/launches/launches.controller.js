const {
    getAllLaunches,
    scheduleNewLaunch,
    getOneLaunch,
    abortLaunch,
    launchExists,
} = require('../../models/launches.model');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    console.log(req.query);
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    res.status(200).json(launches);
}

async function httpGetOneLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber);
    res.status(200).json(await getOneLaunch(flightNumber));
}

async function httpCreateLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket ||
        !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required property',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid date',
        });
    }
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber);

    if (!await launchExists(flightNumber)) {
        return res.status(400).json({
            error: 'Launch not found',
        });
    }
    const aborted = await abortLaunch(flightNumber);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        });
    }
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpCreateLaunch,
    httpGetOneLaunch,
    httpAbortLaunch,
};