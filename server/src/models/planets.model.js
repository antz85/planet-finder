const fs = require('fs')
const path = require('path')

const {parse} = require('csv-parse');

const habitablePlanets = []

// Create criteria for a planet to be habitable
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

// IMPORTANT: Node will try to export this function before any of the data gets loaded
// Therefore we must make the function asynchronous
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data))
                    habitablePlanets.push(data)
            })
            .on('error', (err) => {
                reject(err);
            })
            .on('end', () => {
                resolve();
                console.log(`${habitablePlanets.length} habitable planets found!`)
            })
    })
}

function getAllPlanets() {
    return habitablePlanets
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}