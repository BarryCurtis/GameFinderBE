"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.postNewUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
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
    ])
        .then((newUser) => {
        console.log(newUser);
        if (newUser.rowCount === 0) {
            return Promise.reject({
                status: 404,
                msg: `user ${body.firebase_id} - does not exist`,
            });
        }
        return newUser.rows[0];
    })
        .catch((err) => console.log(err));
};
exports.updateUser = updateUser;
