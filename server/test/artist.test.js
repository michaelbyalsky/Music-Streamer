require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { Album, Artist, User } = require("../models");
const { Op } = require("sequelize");

const userMock = {
  email: process.env.LOGIN,
  password: process.env.USERPASSWORD,
};

const userDataMock = {
  email: userMock.email,
  password: userMock.password,
};

const artistMock = {
  name: "michael",
  artist_img: "gggggg",
};

let header;

describe("api v1", () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  beforeAll(async () => {
    const response = await request(app)
      .post("/users/validation")
      .send(userMock)
      .expect(200);

    header = response.header;
    await request(app)
      .post("/artists")
      .set("Authorization", header["authorization"])
      .send(artistMock)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
  afterEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it("Can create artist", async () => {
    const { body } = await request(app)
      .post("/artists")
      .set("Authorization", header["authorization"])
      .send(artistMock)
      .expect(200);
    expect(body.name).toBe(artistMock.name);
  });

  it("Can get single artist", async () => {
    const { body: newArtist } = await request(app)
      .post("/artists")
      .set("Authorization", header["authorization"])
      .send(artistMock)
      .expect(200);
    const { body: getSingleArtistResponseBody } = await request(app)
      .get(`/artists/${newArtist.id}`)
      .expect(200);
    expect(getSingleArtistResponseBody.name).toBe(artistMock.name);
    expect(getSingleArtistResponseBody.id).toBe(newArtist.id);
  });
});
