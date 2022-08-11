const application = require("../public/app/app");
const app = application.default;
const db = require("../public/db/connection");
const seed = require("../public/db/seed");
const request = require("supertest");
const testData = require("../public/db/data/index");

describe("GET /api/events/comments/:event_id", () => {
  test("return all comments by event id", () => {
    return request(app)
      .get("/api/events/comments/1")
      .expect(200)
      .then(({ body: { comments } }) => {
        comments.forEach((comment) => {
          expect(comment).toEqual({
            comment_id: expect.any(Number),
            firebase_id: expect.any(String),
            event_id: 1,
            comment_time: expect.any(String),
            comment_body: expect.any(String),
          });
        });
      });
  });
});

//error handling
describe("GET /api/events/comments/:event_id error handle", () => {
  test("return 404 not found when passed un existed event_id", () => {
    return request(app)
      .get("/api/events/comments/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("event id 100 does not exist");
      });
  });
  test("return 400 bad request when passed wrong event_id type", () => {
    return request(app)
      .get("/api/events/comments/banana")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("invalid event id banana");
      });
  });
});
