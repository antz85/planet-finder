const {
    getAllLaunches,
    addNewLaunch,
    getOneLaunch,
    abortLaunch,
    launchExists,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches())
}

function httpGetOneLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber);
    res.status(200).json(getOneLaunch(flightNumber))
}

function httpCreateLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket ||
        !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required property'
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid date'
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const flightNumber = Number(req.params.flightNumber);

    if (!launchExists(flightNumber)) {
        return res.status(400).json({
            error: 'Launch not found'
        })
    }
    return res.status(200).json(abortLaunch(flightNumber))
}

module.exports = {
    httpGetAllLaunches,
    httpCreateLaunch,
    httpGetOneLaunch,
    httpAbortLaunch
}