"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const postNewUser = (body) => {
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
