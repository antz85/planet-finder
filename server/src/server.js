// Global imports
const http = require('http');

// Local imports
const app = require('./app');
const { loadPlanetsData } = require("./models/planets.model");
const { connectToMongo } = require('./services/mongo');
const { loadLaunchData } = require('./models/launches.model');

// Variables
const PORT = process.env.PORT || 8000;

// Create server
const server = http.createServer(app);

async function startServer() {
    await connectToMongo();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
