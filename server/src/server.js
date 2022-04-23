// Global imports
const https = require('http');

// get you .env file to work
// DISCUSS: require('dotenv').config(); moved to mongo.js file

// Local imports
const app = require('./app');
const { loadPlanetsData } = require("./models/planets.model");
const { connectToMongo } = require('./services/mongo');
const { loadLaunchData } = require('./models/launches.model');

// Variables
const PORT = process.env.PORT || 8000;

// Create server
const server = https.createServer(app);

async function startServer() {
    await connectToMongo();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
