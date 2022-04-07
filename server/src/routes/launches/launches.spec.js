const request = require('supertest');
const app = require('../../app');
const { connectToMongo } = require('../../services/mongo');
const { disconnectMongo } = require('../../services/mongo');

describe('Testing Launches API', () => {

    beforeAll(async () => {
        await connectToMongo();
    });

    afterAll(async () => {
        await disconnectMongo();
    });

    describe('Test GET /launches', () => {
        it('should respond with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'Millennium Falcon',
            target: 'Kepler-442 b',
            launchDate: 'January 4, 32033',
        };
        const { launchDate, ...launchDataWithoutDate } = completeLaunchData;


        it('should respond with 200 success', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate);
            const responseDate = new Date(response.body.launchDate);

            expect(responseDate).toEqual(requestDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
        it('should catch missing required property', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: 'Missing required property',
            });
        });
        it('should catch invalid launch date', async () => {
            const response = await request(app)
                .post('/launches')
                .send({ ...completeLaunchData, launchDate: 'hello' })
                .expect('Content-type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: 'Invalid date',
            });
        });
    });
});
