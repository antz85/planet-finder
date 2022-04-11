const express = require('express');

const launchDownloadDatesRouter = express.Router();

const { httpGetAllDownloads } = require('./launchDownloadDates.controller');

launchDownloadDatesRouter.get('/', httpGetAllDownloads);

module.exports = launchDownloadDatesRouter;