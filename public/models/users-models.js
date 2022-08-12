"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookEvent = exports.updateUser = exports.postNewUser = exports.fetchUserById = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const checkExist_1 = require("../utils/checkExist");
const fetchUserById = (firebase_id) => {
    return connection_1.default
        .query(`SELECT *
  FROM users
  WHERE users.firebase_id = $1`, [firebase_id])
        .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: `User not found for user_id: ${firebase_id}`,
            });
        }
        return result.rows[0];
    });
};
exports.fetchUserById = fetchUserById;
const postNewUser = (body) => {
    if (!body.firebase_id ||
        !body.name ||
        !body.username ||
        !body.age ||
        !body.gender ||
        !body.profile_icon ||
        !body.skills_level ||
        !body.rating ||
        !body.event_id) {
        return Promise.reject({
            status: 400,
            msg: `Invalid - input must be in form {firebase_id: string,
        name: string,
        username: string,
        age: number,
        gender: string,
        profile_icon: string,
        skills_level: string,
        rating: number,
        event_id: number}`,
        });
    }
    return connection_1.default
        .query(`INSERT INTO users
        (firebase_id, name, username, age, gender, profile_icon, skills_level, rating, event_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING * ;
        `, [
        body.firebase_id,
        body.name,
        body.username,
        body.age,
        body.gender,
        body.profile_icon,
        body.skills_level,
        body.rating,
        body.event_id,
    ])
        .then((newUser) => {
        return newUser.rows[0];
    })
        .catch((err) => console.log(err));
};
exports.postNewUser = postNewUser;
const updateUser = (body) => {
    if (!body.firebase_id ||
        !body.name ||
        !body.username ||
        !body.age ||
        !body.gender ||
        !body.profile_icon ||
        !body.skills_level ||
        !body.rating ||
        !body.event_id)
        return Promise.reject({
            status: 400,
            msg: `Invalid - input must be in form {firebase_id: string,
        name: string,
        username: string,
        age: number,
        gender: string,
        profile_icon: string,
        skills_level: string,
        rating: number,
        event_id: number}`,
        });
    return (0, checkExist_1.checkExist)("users", "firebase_id", body.firebase_id).then(() => {
        return connection_1.default
            .query(`UPDATE users SET name=$2, username=$3, age=$4, profile_icon=$5, skills_level=$6, rating=$7
      WHERE firebase_id=$1 RETURNING *
      `, [
            body.firebase_id,
            body.name,
            body.username,
            body.age,
            body.profile_icon,
            body.skills_level,
            body.rating,
        ]);
    }).then((newUser) => {
        if (newUser.rowCount === 0) {
            return Promise.reject({
                status: 404,
                msg: `user ${body.firebase_id} - does not exist`,
            });
        }
        return newUser.rows[0];
    });
};
exports.updateUser = updateUser;
const bookEvent = (firebase_id, event_id) => {
    return (0, checkExist_1.checkExist)("users", "firebase_id", firebase_id).then(() => {
        return (0, checkExist_1.checkExist)("events", "event_id", event_id).then(() => {
            return connection_1.default.query(`INSERT INTO userevents (firebase_id, event_id) VALUES ($1,$2) RETURNING *`, [firebase_id, event_id]);
        });
    })
        .then(result => {
        return result.rows[0];
    });
};
exports.bookEvent = bookEvent;
