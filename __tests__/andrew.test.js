const application = require("../public/app/app");
const app = application.default;
const db = require("../public/db/connection");
const seed = require("../public/db/seed");
const request = require("supertest");
const testData = require("../public/db/data/index");

beforeAll(() => {
  return seed.default(testData).then(() => {});
});

afterAll(() => {
  db.end();
});

describe("09 POST - api/users", () => {
  test("400 - invalid input type ", () => {
    const newUser = {
      name: "Andrew Sheffield",
      username: "AndyS",
      age: 38,
      gender: "male",
      profile_icon: `http://3.bp.blogspot.com/-A1soAA90eNI/U8l74yyHMcI/AAAAAAAADsg/IJ6_ltfctgY/s1600/cover+Ronaldo+Brazil.jpg`,
      skills_level: 5,
      rating: 25,
      event_id: 21,
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`Invalid - input must be in form {firebase_id: string,
        name: string,
        username: string,
        age: number,
        gender: string,
        profile_icon: string,
        skills_level: string,
        rating: number,
        event_id: number}`);
      });
  });
});

describe("09 patch - api/users", () => {
  test("201 - updates user with new info", () => {
    const newUser = {
      firebase_id: "19a",
      name: "Neville Southall",
      username: "Big Nev",
      age: 65,
      gender: "male",
      profile_icon: `http://2.bp.blogspot.com/-nmpHb2QLRd0/U8lk9f0GztI/AAAAAAAADrk/Taq7WVSVc2U/s1600/neville+southall.jpg`,
      skills_level: 5,
      rating: 5,
      event_id: 1,
    };

    return request(app)
      .patch("/api/users")
      .send(newUser)
      .expect(200)
      .then((result) => {
        expect(result.body.newuser).toEqual({
          user_id: expect.any(Number),
          firebase_id: expect.any(String),
          name: expect.any(String),
          username: expect.any(String),
          age: expect.any(Number),
          gender: expect.any(String),
          profile_icon: expect.any(String),
          skills_level: expect.any(String),
          rating: expect.any(Number),
          event_id: expect.any(Number),
        });
      });
  });
});

describe("11 PATCH - ERRORS - api/users", () => {
  test("400 - invalid input type ", () => {
    const newUser = {
      username: "AndyS",
      age: 38,
      gender: "male",
      profile_icon: `http://3.bp.blogspot.com/-A1soAA90eNI/U8l74yyHMcI/AAAAAAAADsg/IJ6_ltfctgY/s1600/cover+Ronaldo+Brazil.jpg`,
      skills_level: 5,
      rating: 25,
      event_id: 21,
    };
    return request(app)
      .patch("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`Invalid - input must be in form {firebase_id: string,
        name: string,
        username: string,
        age: number,
        gender: string,
        profile_icon: string,
        skills_level: string,
        rating: number,
        event_id: number}`);
      });
  });
  test("404 - handles bad path - no such article id", () => {
    return request(app)
      .patch("/api/users")
      .send({
        firebase_id: "1000",
        username: "AndyS",
        age: 38,
        gender: "male",
        profile_icon: `http://3.bp.blogspot.com/-A1soAA90eNI/U8l74yyHMcI/AAAAAAAADsg/IJ6_ltfctgY/s1600/cover+Ronaldo+Brazil.jpg`,
        skills_level: 5,
        rating: 25,
        event_id: 21,
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("user 1000 - does not exist");
      });
  });
});
