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

describe("APP GET", () => {
  describe("GET EVENTS api/events", () => {
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

    describe("GET /api/events/:event_id", () => {
      test("status:200, responds with the correct single event object", () => {
        const event_id = 1;
        return request(app)
          .get(`/api/events/${event_id}`)
          .expect(200)
          .then(({ body: { event } }) => {
            expect(event).toEqual({
              event_id: event_id,
              firebase_id: "1a",
              category: "football",
              date: "19/08/2022",
              time: "20:00",
              duration: 1,
              gender: "male",
              skills_level: "1",
              location: "M8 0AE",
              needed_players: 3,
              age_group: "50+",
              cost: 5,
            });
          });
      });
    });
  });
  describe("GET COMMENTS /api/events/:event_id/comments", () => {
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
  describe("GET USERS /api/users/:user_id", () => {
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
            skills_level: "1",
            user_id: 1,
            rating: 5,
            event_id: 1,
          });
        });
    });
  });
});

describe("APP POST", () => {
  describe("POST EVENT /api/events", () => {
    test("status: 201, posts a new event and responds with posted event", () => {
      const newEvent = {
        firebase_id: "1a",
        category: "football",
        date: "25/08/2022",
        time: "20:00",
        duration: 1,
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
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({
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

  describe("POST USER /api/users", () => {
    test("201 - Posts user with correct info", () => {
      const newUser = {
        firebase_id: "21a",
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
        .post("/api/users/")
        .send(newUser)
        .expect(201)
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

  describe("POST COMMENT /api/events/:event_id/comments", () => {
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
  describe("POST api/users/events",()=>{
    test("add input to userevents and rturn it",()=>{
      return request(app).post("/api/user/events").send({firebase_id: "1a", event_id: 1})
      .expect(201).then(({body:{event}})=>{
        expect(event).toEqual({firebase_id:"1a", event_id:1, userevent_id: expect.any(Number)})
      })
    })
  })
});

describe("APP PATCH", () => {
  describe("PATCH USERS - api/users", () => {
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
  describe("PATCH EVENTS /api/events/:event_id", () => {
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
  });
});
// error handling
describe("ERROR HANDLING", () => {
  describe("PATH invalid path", () => {
    test("should return 404 no such route", () => {
      return request(app)
        .get("/api/cats")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("404 no such route");
        });
    });
  });
  describe("GET EVENT /api/events/:event_id", () => {
    test("status:400, responds with a bad request error message when passed a bad event ID", () => {
      return request(app)
        .get("/api/events/notAnId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid event ID notAnId");
        });
    });
    test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
      return request(app)
        .get("/api/events/9999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Event not found for event_id: 9999");
        });
    });
  });
  describe("GET COMMENTS/api/events/comments/:event_id error handle", () => {
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
  describe("GET USERS /api/users/:user_id", () => {
    test("status:404, respond with an error message when passed a valid ID that is not found", () => {
      return request(app)
        .get("/api/users/777a")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User not found for user_id: 777a");
        });
    });
  });
  describe("POST USERS /api/users", () => {
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
          expect(msg)
            .toBe(`Invalid - input must be in form {firebase_id: string,
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
  describe("POST COMMENTS /api/events/comments/:event_id error handle", () => {
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
  describe("POST EVENTS /api/events", () => {
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
  describe("PATCH USER  /api/users", () => {
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
          expect(msg)
            .toBe(`Invalid - input must be in form {firebase_id: string,
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
    test("404 - handles bad path - no such user id", () => {
      return request(app)
        .patch("/api/users")
        .send({
          firebase_id: "1000",
          name: "beyar",
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
          expect(msg).toBe("1000 does not exist");
        });
    });
  });
  describe("PATCH EVENT /api/events/:event_id", () => {
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
});
