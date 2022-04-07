const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:cBG6P8PBSVVspfXQ@nasacluster.qfsij.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function connectToMongo() {
    await mongoose.connect(MONGO_URL);
}

module.exports = {
    connectToMongo
}
