/**
 * @jest-environment node
 */

require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { Album, Artist, User } = require("../models");
const { Op } = require("sequelize");

const userMock = {
  email: process.env.LOGIN,
  password: process.env.USERPASSWORD,
};

const albumMock = {
  name: "new album name",
};

let header;

describe("check albums routs", () => {
  beforeAll(async () => {
    const response = await request(app)
      .post("/users/validation")
      .send(userMock)
      .expect(200);

    header = response.header;

    const { body: newAlbum } = await request(app)
      .post("/albums/addalbum")
      .set("Authorization", header["authorization"])
      .send(albumMock)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
  afterEach(async () => {
    await Album.destroy({ truncate: true, force: true });
  });

  it("Can get all albums", async () => {
    const { body: newAlbum } = await request(app)
      .post("/albums/addalbum")
      .set("Authorization", header["authorization"])
      .send(albumMock)
      .expect(200);

    const { body: getAllAlbums } = await request(app)
      .get(`/albums/all`)
      .set("Authorization", header["authorization"])
      .expect(200);

    expect(getAllAlbums.length > 0).toBe(true);
    const albumsFromDB = await Album.findAll();
    expect(albumsFromDB.length > 0).toBe(true);

    expect(albumsFromDB.length).toBe(getAllAlbums.length);
  });
});
