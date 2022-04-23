const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function connectToMongo() {
    await mongoose.connect(MONGO_URL);
}

async function disconnectMongo() {
    await mongoose.disconnect();
}

module.exports = {
    connectToMongo,
    disconnectMongo,
};
