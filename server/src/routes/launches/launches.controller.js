const {getAllLaunches, addNewLaunch, getOneLaunch} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches())
}

function httpGetOneLaunch(req, res) {
    res.status(200).json(getOneLaunch(req.params.flightNumber))
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
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid date'
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

module.exports = {
    httpGetAllLaunches,
    httpCreateLaunch,
    httpGetOneLaunch,
}