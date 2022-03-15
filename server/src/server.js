// Global imports
const http = require('http')

// Local imports
const app = require('./app')
const {loadPlanetsData} = require("./models/planets.model");

// Variables
const PORT = process.env.PORT || 8000;

// Create server
const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer();

module.exports = PORT