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
  test("400 - no such key - wrong key - body ", () => {
    const newUser = {
      name: "Andrew Sheffield",
      username: "AndyS",
      age: 38,
      gender: "male",
      profile_icon:
        "http://3.bp.blogspot.com/-A1soAA90eNI/U8l74yyHMcI/AAAAAAAADsg/IJ6_ltfctgY/s1600/cover+Ronaldo+Brazil.jpg",
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
