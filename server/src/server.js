// Global imports
const http = require('http');

// Local imports
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetsData } = require("./models/planets.model");

// Variables
const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:cBG6P8PBSVVspfXQ@nasacluster.qfsij.mongodb.net/nasa?retryWrites=true&w=majority';

// Create server
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready');
})
mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();

// module.exports = PORT