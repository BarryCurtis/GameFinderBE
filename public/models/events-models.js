"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEventById = exports.addEvent = exports.fetchEvents = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchEvents = (query) => {
    const validQeries = ["football", "netball", "squash", "male", "female", "mixed", "18-30", "30-50", "50+"];
    let qeuryStr = "SELECT * FROM events WHERE 1 = 1";
    if (query) {
        if (Object.keys(query).includes("category")) {
            qeuryStr += ` AND category = '${query.category}'`;
        }
        if (Object.keys(query).includes("age_group")) {
            qeuryStr += ` AND age_group = '${query.age_group}'`;
        }
        if (Object.keys(query).includes("gender")) {
            qeuryStr += ` AND gender = '${query.gender}'`;
        }
    }
    return connection_1.default.query(qeuryStr).then((result) => {
        return result.rows;
    });
};
exports.fetchEvents = fetchEvents;
const addEvent = (firebase_id, category, date, time, duration, gender, skills_level, location, needed_players, age_group, cost) => {
    return connection_1.default
        .query(`INSERT INTO events
        (firebase_id, category, date, time, duration, gender,
        skills_level, location, needed_players, age_group, cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *;`, [
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
    ])
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.addEvent = addEvent;
const fetchEventById = (event_id) => {
    if (isNaN(Number(event_id))) {
        return Promise.reject({
            status: 400,
            msg: `Invalid event ID ${event_id}`,
        });
    }
    return connection_1.default
        .query(`SELECT *
    FROM events
    WHERE events.event_id = $1 
    `, [event_id])
        .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: `Event not found for event_id: ${event_id}`,
            });
        }
        return result.rows[0];
    });
};
exports.fetchEventById = fetchEventById;
