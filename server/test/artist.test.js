const request = require('supertest')
const app = require('../app')
const { Artist } = require('../models')
const interaction = require('../models/interaction')

const artistMock = {
    name: 'michael',
    artist_img: 'gggggg',
}

describe('api v1', async () => {
    beforeEach(async () => {
        await Artist.destroy({truncate: true, force: true})
    })

    it('Can create artist', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        const { body } = await request(app).post('/artists').send(artistMock);(artistMock);
        expect(body.name).toBe(artistMock.name)
    })

    it('Can get single artist', async () => {
        const { body: newArtist } = await request(app).post('/artists').send(artistMock);
        console.log(newArtist);
        console.log(body);
        const { body: getSingleArtistResponseBody } = await request(app).get(`/artists/${newArtist.id}`);
        expect(getSingleArtistResponseBody.name).toBe(artistMock.name)
        expect(getSingleArtistResponseBody.id).toBe(newArtist.id)
    })
})

