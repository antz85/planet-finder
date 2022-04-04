const {getAllLaunches} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    res.status(200).json(Array.from(getAllLaunches()))
}

module.exports = {
    httpGetAllLaunches
}