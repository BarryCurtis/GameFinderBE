"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./connection");
const format = require("pg-format");
// const createUsersRef = require("../utilities");
const seed = ({ comments, users, sportevents }) => {
    return db
        .query(`DROP TABLE IF EXISTS users`)
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS events`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS comments`);
    })
        .then(() => {
        return db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        firebase_id VARCHAR NOT NULL,
        username VARCHAR(50) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        age INT,
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
      firebase_id INT REFERENCES users(user_id),
      category VARCHAR NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      gender TEXT,
      skills_level TEXT,
      location VARCHAR NOT NULL,
      needed_players INT,
      duration TIME NOT NULL,
      age_group TEXT,
      cost INT
      );`);
    })
        .then(() => {
        return db.query(`
     CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      firebase_id INT REFERENCES users(user_id),
      event_id INT REFERENCES events(event_id),
      comment_body TEXT,
      comment_time Timestamp NOT NULL
      );`);
    });
};
exports.default = seed;
