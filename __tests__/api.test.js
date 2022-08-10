const application = require("../public/app/app");
const app = application.default;
const db = require("../public/db/connection");
const seed = require("../public/db/seed");
const request = require("supertest");
const testData = require("../public/db/data/index");

beforeEach(() => {
  return seed.default(testData).then(() => {});
});

afterAll(() => {
  db.end();
});

describe("app", () => {
  describe("GET api/events", () => {
    test("status: 200, responds with all events as an array of events objects", () => {
      return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).not.toBe(0);
          events.forEach((event) => {
            expect(event).toEqual({
              event_id: expect.any(Number),
              firebase_id: expect.any(String),
              category: expect.any(String),
              date: expect.any(String),
              time: expect.any(String),
              duration: expect.any(Number),
              gender: expect.any(String),
              skills_level: expect.any(String),
              location: expect.any(String),
              needed_players: expect.any(Number),
              age_group: expect.any(String),
              cost: expect.any(Number),
            });
          });
        });
    });
    describe("GET /api/events?filter", () => {
      test("returns all events where category is equal to football as an array of objects", () => {
        return request(app)
          .get("/api/events?category=football")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.forEach((event) => {
              expect(event).toEqual({
                event_id: expect.any(Number),
                firebase_id: expect.any(String),
                category: "football",
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(String),
                location: expect.any(String),
                needed_players: expect.any(Number),
                age_group: expect.any(String),
                cost: expect.any(Number),
              });
            });
          });
      });
      test("returns all events where category is equal to netball as an array of objects", () => {
        return request(app)
          .get("/api/events?category=netball")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.forEach((event) => {
              expect(event).toEqual({
                event_id: expect.any(Number),
                firebase_id: expect.any(String),
                category: "netball",
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(String),
                location: expect.any(String),
                needed_players: expect.any(Number),
                age_group: expect.any(String),
                cost: expect.any(Number),
              });
            });
          });
      });
      test("returns all events where category is equal to squash as an array of objects", () => {
        return request(app)
          .get("/api/events?category=squash")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.forEach((event) => {
              expect(event).toEqual({
                event_id: expect.any(Number),
                firebase_id: expect.any(String),
                category: "squash",
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(String),
                location: expect.any(String),
                needed_players: expect.any(Number),
                age_group: expect.any(String),
                cost: expect.any(Number),
              });
            });
          });
      });
      test("returns all events where gender is equal to male as an array of objects", () => {
        return request(app)
          .get("/api/events?gender=male")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.forEach((event) => {
              expect(event).toEqual({
                event_id: expect.any(Number),
                firebase_id: expect.any(String),
                category: expect.any(String),
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: "male",
                skills_level: expect.any(String),
                location: expect.any(String),
                needed_players: expect.any(Number),
                age_group: expect.any(String),
                cost: expect.any(Number),
              });
            });
          });
      });
      test("returns all events where age group is equal to 18-30 as an array of objects", () => {
        return request(app)
          .get("/api/events?age_group=18-30")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.forEach((event) => {
              expect(event).toEqual({
                event_id: expect.any(Number),
                firebase_id: expect.any(String),
                category: expect.any(String),
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(String),
                location: expect.any(String),
                needed_players: expect.any(Number),
                age_group: "18-30",
                cost: expect.any(Number),
              });
            });
          });
      });
    });

    describe("GET /api/events?sortby", () => {
      test("returns all events sorted by time in ASC order", () => {
        return request(app)
          .get("/api/events?sort_by=time&order=ASC")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            expect(events).toBeSortedBy("time");
          });
      });
    });
  });
});

describe("ERORR HANDLING", () => {
  describe("invalid path", () => {
    test("should return 404 no such route", () => {
      return request(app)
        .get("/api/cats")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("404 no such route");
        });
    });
    describe("GET /api/events", () => {
      test("status:400 bad request when passed invalid sort_by", () => {
        return request(app)
          .get("/api/events?sort_by=banana")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Sort by query invalid");
          });
      });
      test("status:400 bad request when passed invalid order by", () => {
        return request(app)
          .get("/api/events?order=banana")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Order by query invalid");
          });
      });
    });
  });
});

describe.only("09 POST - api/users", () => {
  test("201 - Posts user with correct info", () => {
    const newUser = {
      firebase_id: "21a",
      name: "Andrew Sheffield",
      username: "AndyS",
      age: 38,
      gender: "male",
      profile_icon:
        "http://3.bp.blogspot.com/-A1soAA90eNI/U8l74yyHMcI/AAAAAAAADsg/IJ6_ltfctgY/s1600/cover+Ronaldo+Brazil.jpg",
      skills_level: "fun",
      rating: 25,
      event_id: 21,
    };

    return request(app)
      .post("/api/users/")
      .send(newUser)
      .expect(201)
      .then((result) => {
        expect(result.body.newuser).toEqual({
          user_id: 21,
          firebase_id: "21a",
          name: "Andrew Sheffield",
          username: "AndyS",
          age: 38,
          gender: "male",
          profile_icon:
            "http://3.bp.blogspot.com/-A1soAA90eNI/U8l74yyHMcI/AAAAAAAADsg/IJ6_ltfctgY/s1600/cover+Ronaldo+Brazil.jpg",
          skills_level: "fun",
          rating: 25,
          event_id: 21,
        });
      });
  });
});
