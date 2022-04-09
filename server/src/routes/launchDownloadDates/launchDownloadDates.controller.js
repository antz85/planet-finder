const { getAllDownloads } = require('../../models/launchDownloadDates.model');

async function httpGetAllDownloads(req, res) {
    res.status(200).json(await getAllDownloads());
}

module.exports = { httpGetAllDownloads }