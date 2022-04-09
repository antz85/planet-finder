const mongoose = require('mongoose');

const launchDownloadDatesSchema = new mongoose.Schema({
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
});

module.exports = mongoose.model('LaunchDownloadDate', launchDownloadDatesSchema);