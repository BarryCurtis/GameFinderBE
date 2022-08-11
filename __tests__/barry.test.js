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

describe("#7 POST NEW EVENT", () => {
  test("status: 400, posts an invalid event and responds with 400 error message", () => {
    const newEvent = {
      category: "football",
      date: "25/08/2022",
      time: "20:00",
      gender: "male",
      skills_level: 2,
      location: "M8 0AE",
      needed_players: 2,
      age_group: "18-30",
      cost: 5,
    };
    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`Invalid object passed, please use format:
        {
  firebase_id: string,
  category: string,
  date: string,
  time: string,
  duration: number,
  gender: string,
  skills_level: number,
  location: string,
  needed_players: number,
  age_group: string,
  cost: number
}
`);
      });
  });
});

describe("PATCH /api/events/:event_id", () => {
  test("200 response returns updated event", () => {
    const updatedEvent = {
      event_id: 1,
      firebase_id: "1a",
      category: "football",
      date: "19/08/2022",
      time: "20:00",
      duration: 1,
      gender: "male",
      skills_level: 1,
      location: "M8 0AE",
      needed_players: 2,
      age_group: "50+",
      cost: 5,
    };
    return request(app)
      .patch("/api/events/1")
      .send(updatedEvent)
      .expect(200)
      .then(({ body }) => {
        expect(body.event).toBeInstanceOf(Object);
        expect(body.event).toEqual({
          event_id: 1,
          firebase_id: "1a",
          category: "football",
          date: "19/08/2022",
          time: "20:00",
          duration: 1,
          gender: "male",
          skills_level: "1",
          location: "M8 0AE",
          needed_players: 2,
          age_group: "50+",
          cost: 5,
        });
      });
  });
  test("404 response returns error page not found when an event doesn't exist ", () => {
    const updatedEvent = {
      event_id: 999,
      firebase_id: "1a",
      category: "football",
      date: "19/08/2022",
      time: "20:00",
      duration: 1,
      gender: "male",
      skills_level: 1,
      location: "M8 0AE",
      needed_players: 2,
      age_group: "50+",
      cost: 5,
    };
    return request(app)
      .patch("/api/events/999")
      .send(updatedEvent)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event doesn't exist, please try again");
      });
  });
  test("400 response returns bad request error when passed an invalid type", () => {
    const updatedEvent = {
      event_id: 1,
      firebase_id: "1a",
      category: "football",
      date: "19/08/2022",
      time: "20:00",
      skills_level: 1,
      location: "M8 0AE",
      needed_players: 2,
      age_group: "50+",
      cost: 5,
    };
    return request(app)
      .patch("/api/events/1")
      .expect(400)
      .send(updatedEvent)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(`Invalid object passed, please use format:
        {
  firebase_id: string,
  category: string,
  date: string,
  time: string,
  duration: number,
  gender: string,
  skills_level: number,
  location: string,
  needed_players: number,
  age_group: string,
  cost: number
}
`);
      });
  });
});
