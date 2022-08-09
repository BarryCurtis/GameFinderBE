"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const pg_format_1 = __importDefault(require("pg-format"));
// const createUsersRef = require("../utilities");
const seed = ({ comments, users, sportevents, userevents }) => {
    return connection_1.default
        .query(`DROP TABLE IF EXISTS userevents`)
        .then(() => {
        connection_1.default.query(`DROP TABLE IF EXISTS comments`);
    })
        .then(() => {
        return connection_1.default.query(`DROP TABLE IF EXISTS events`);
    })
        .then(() => {
        return connection_1.default.query(`DROP TABLE IF EXISTS users`);
    })
        .then(() => {
        return connection_1.default.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        firebase_id VARCHAR UNIQUE NOT NULL,
        username VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        age INT,
        gender TEXT,
        profile_icon VARCHAR,
        skills_level TEXT,
        rating INT,
        event_id INT
      );`);
    })
        .then(() => {
        return connection_1.default.query(`
     CREATE TABLE events (
      event_id SERIAL PRIMARY KEY,
      firebase_id VARCHAR REFERENCES users(firebase_id),
      category VARCHAR NOT NULL,
      date TEXT,
      time TEXT,
      duration INT NOT NULL,
      gender TEXT,
      skills_level TEXT,
      location VARCHAR NOT NULL,
      needed_players INT,
      age_group TEXT,
      cost INT
      );`);
    })
        .then(() => {
        return connection_1.default.query(`
     CREATE TABLE userevents (
      userevent_id SERIAL PRIMARY KEY,
      firebase_id VARCHAR REFERENCES users(firebase_id),
      event_id INT REFERENCES events(event_id)
      );`);
    })
        .then(() => {
        return connection_1.default.query(`
     CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      firebase_id VARCHAR REFERENCES users(firebase_id),
      event_id INT REFERENCES events(event_id),
      comment_body TEXT,
      comment_time TIMESTAMP NOT NULL
      );`);
    })
        .then(() => {
        const queryStr = (0, pg_format_1.default)(`
      INSERT INTO users
        (firebase_id, name, username, age, gender, profile_icon, skills_level, rating, event_id)
      VALUES
        %L
      RETURNING *;
      `, users.map(({ firebase_id, name, username, age, gender, profile_icon, skills_level, rating, event_id, }) => [
            firebase_id,
            name,
            username,
            age,
            gender,
            profile_icon,
            skills_level,
            rating,
            event_id,
        ]));
        return connection_1.default.query(queryStr);
    })
        .then(() => {
        const queryStr = (0, pg_format_1.default)(`
      INSERT INTO events
        (firebase_id, category, date, time, duration, gender, skills_level, location, needed_players, age_group, cost)
      VALUES
        %L
      RETURNING *;
      `, sportevents.map(({ firebase_id, category, date, time, duration, gender, skills_level, location, needed_players, age_group, cost, }) => [
            firebase_id,
            category,
            date,
            time,
            duration,
            gender,
            skills_level,
            location,
            needed_players,
            age_group,
            cost,
        ]));
        return connection_1.default.query(queryStr);
    })
        .then(() => {
        const queryStr = (0, pg_format_1.default)(`
      INSERT INTO comments
        (event_id, firebase_id, comment_body, comment_time)
      VALUES
        %L
      RETURNING *;
      `, comments.map(({ event_id, firebase_id, comment_body, comment_time }) => [
            event_id,
            firebase_id,
            comment_body,
            comment_time,
        ]));
        return connection_1.default.query(queryStr);
    })
        .then(() => {
        const queryStr = (0, pg_format_1.default)(`
      INSERT INTO userevents
        (event_id, firebase_id)
      VALUES
        %L
      RETURNING *;
      `, userevents.map(({ event_id, firebase_id }) => [event_id, firebase_id]));
        return connection_1.default.query(queryStr);
    });
};
exports.default = seed;
