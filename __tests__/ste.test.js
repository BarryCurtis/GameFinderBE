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

describe("GET /api/users/:user_id", () => {
  test("status: 200, responds with the correct single user object", () => {
    return request(app)
      .get("/api/users/1a")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          firebase_id: "1a",
          name: "Barry Curtis",
          username: "BarryC",
          age: 21,
          gender: "male",
          profile_icon:
            "https://media.istockphoto.com/photos/ordinary-man-smiling-picture-id182174089?k=20&m=182174089&s=612x612&w=0&h=foKfJKm1MC3-bxFksAGvW4OJGIUQibt6yqWnVTRXYEI=",
          skills_level: "fun",
          user_id: 1,
          rating: 5,
          event_id: 1,
        });
      });
  });

  test("status:404, respond with an error message when passed a valid ID that is not found", () => {
    return request(app)
      .get("/api/users/777a")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found for user_id: 777a");
      });
  });
});
