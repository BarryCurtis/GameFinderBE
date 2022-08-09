const db = require("./");
const format = require("pg-format");
const createUsersRef = require("../utilities");

const seed = ({ userData, eventsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS ;`)
    .then(() => {
      return db
        .query(`DROP TABLE IF EXISTS users`)
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS events`);
        })
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS comments`);
        });
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email TEXT,
        age INT,
        password TEXT NOT NULL,
        profile_icon VARCHAR,
        skills_level TEXT,
        rating INT,
        event_id INT REFERENCES events(event_id)
      );`);
    })
    .then(() => {
      return db.query(`
     CREATE TABLE events (
      event_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      category VARCHAR NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      gender TEXT,
      rating INT,
      skills_level TEXT,
      location VARCHAR NOT NULL,
      needed_players INT,
      cost INT,
      age_group TEXT
      );`);
    })
    .then(() => {
      return db.query(`
     CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      event_id INT REFERENCES events(event_id),
      comment_body TEXT,
      comment_time Timestamp NOT NULL
      );`);
    });
};

module.exports = seed;
