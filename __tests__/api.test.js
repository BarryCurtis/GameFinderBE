const app = require("../public/app");
const db = require("../public/db/connection");
const seed = require("../public/db/seed");
const request = require("supertest");
const testData = require("../public/db/data/index");
const { describe } = require("node:test");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => db.end());

describe("app", () => {
  describe("GET api/events", () => {
    test("status: 200, responds with all events as an array of events objects", () => {
      return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).not.toBe(0);
          events.foreEach((event) => {
            expect(event).toEqual({
              event_id: 1,
              firebase_id: expect.any(String),
              category: expect.any(String),
              date: expect.any(String),
              time: expect.any(String),
              duration: expect.any(Number),
              gender: expect.any(String),
              skills_level: expect.any(Number),
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
            events.foreEach((event) => {
              expect(event).toEqual({
                event_id: 1,
                firebase_id: expect.any(String),
                category: "football",
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(Number),
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
            events.foreEach((event) => {
              expect(event).toEqual({
                event_id: 1,
                firebase_id: expect.any(String),
                category: "netball",
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(Number),
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
            events.foreEach((event) => {
              expect(event).toEqual({
                event_id: 1,
                firebase_id: expect.any(String),
                category: "squash",
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(Number),
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
          .get("/api/events")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.foreEach((event) => {
              expect(event).toEqual({
                event_id: 1,
                firebase_id: expect.any(String),
                category: expect.any(String),
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: "male",
                skills_level: expect.any(Number),
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
          .get("/api/events")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            events.foreEach((event) => {
              expect(event).toEqual({
                event_id: 1,
                firebase_id: expect.any(String),
                category: expect.any(String),
                date: expect.any(String),
                time: expect.any(String),
                duration: expect.any(Number),
                gender: expect.any(String),
                skills_level: expect.any(Number),
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
          .get("/api/events?sortby=time&order=ASC")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).not.toBe(0);
            expect(events).toBeSortedBy("time");
          });
      });
    });
  });
});
