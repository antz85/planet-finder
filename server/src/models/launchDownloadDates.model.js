const launchDownloadDates = require('./launchDownloadDates.mongo');

async function saveDownloadDate() {
    const today = new Date();
    await launchDownloadDates.create({
        month: today.getMonth(),
        year: today.getFullYear(),
    });
}

async function getAllDownloads() {
    return launchDownloadDates.find();
}

module.exports = { getAllDownloads };
