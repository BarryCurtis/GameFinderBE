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

describe("GET /api/events/:event_id/comments", () => {
  test("return all comments by event id", () => {
    return request(app)
      .get("/api/events/1/comments")
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
describe("POST /api/events/:event_id/comments", () => {
  test("add comment by event id and return it", () => {
    return request(app)
      .post("/api/events/5/comments")
      .send({
        firebase_id: "5a",
        event_id: 5,
        comment_body: "is there any nearby car park for this event",
        comment_time: "2022-10-16T13:23:00.000Z",
      })
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual({
          comment_id: expect.any(Number),
          firebase_id: "5a",
          event_id: 5,
          comment_body: "is there any nearby car park for this event",
          comment_time: expect.any(String),
        });
      });
  });
});

//error handling
describe("GET /api/events/comments/:event_id error handle", () => {
  test("return 404 not found when passed un existed event_id", () => {
    return request(app)
      .get("/api/events/100/comments")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("event id 100 does not exist");
      });
  });
  test("return 400 bad request when passed wrong event_id type", () => {
    return request(app)
      .get("/api/events/banana/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("invalid event id banana");
      });
  });
});

describe("POST /api/events/comments/:event_id error handle", () => {
  test("return 404 not found when passed un existed event_id", () => {
    return request(app)
      .post("/api/events/100/comments")
      .send({
        firebase_id: "5a",
        event_id: 100,
        comment_body: "is there any nearby car park for this event",
        comment_time: "2022-10-16T13:23:00.000Z",
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("100 does not exist");
      });
  });
  test("return 400 bad request when passed empty comment", () => {
    return request(app)
      .post("/api/events/100/comments")
      .send({
        firebase_id: "5a",
        event_id: 1,
        comment_body: "",
        comment_time: "2022-10-16T13:23:00.000Z",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("cannot post empty comment");
      });
  });
});
