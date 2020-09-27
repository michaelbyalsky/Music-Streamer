const request = require("supertest");
const app = require("../app");
const { Artist } = require("../models");
const usersRouter = require("../routes/users");
const { User } = require("../models");

const userMock = {
  name: "david",
  email: "david@gmail.com",
  password: "david1996",
  birthDate: "01/02/1996",
};

const userDataMock = {
  email: userMock.email,
  password: userMock.password,
};

const artistMock = {
  name: "michael",
  artist_img: "gggggg",
};

describe("api v1", () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
    await request(app).post("/users/register").send(userMock).expect(201);
  });

  it("Can create artist", async () => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    const response = await request(app)
      .post("/users/validation")
      .send(userDataMock)
      .expect(200);
    const header = response.header;
    console.log(header);
    const { body } = await request(app)
    .post("/artists")
    .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);
    expect(body.name).toBe(artistMock.name);
    // .end(function(err, res) {
    //     if (err) return done(err);
    //     done();
  });

  it("Can get single artist", async () => {
    const response = await request(app)
      .post("/users/validation")
      .send(userDataMock)
      .expect(200);
    const header = response.header;
    const { body: newArtist } = await request(app)
      .post("/artists")
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);
    const { body: getSingleArtistResponseBody } = await request(app)
      .get(`/artists/${newArtist.id}`)
      .expect(200);
    expect(getSingleArtistResponseBody.name).toBe(artistMock.name);
    expect(getSingleArtistResponseBody.id).toBe(newArtist.id);
    // .end(function(err, res) {
    //     if (err) return done(err);
    //     done();
  });
});
