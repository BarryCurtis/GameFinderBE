"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEventById = exports.addEvent = exports.fetchEventsByFilter = exports.fetchEvents = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchEvents = () => {
    return connection_1.default.query(`SELECT * FROM events`).then((result) => {
        return result.rows;
    });
};
exports.fetchEvents = fetchEvents;
const fetchEventsByFilter = (sort_by = "time", order = "ASC", sport = "football", gender = "male", age_group = "18-30") => {
    const selected_sort = ["ASC", "DESC", "asc", "desc"];
    const selected_sport = ["football", "netball", "squash"];
    const selected_gender = ["male", "female", "mixed"];
    const selected_age_group = ["18-30", "30-50", "50+"];
    let queryStr = `SELECT events.* FROM events WHERE category = $1
 AND gender = $2 AND age_group = $3
 ORDER BY ${sort_by} ${order}`;
    return connection_1.default.query(`${queryStr}`, [sport, gender, age_group]).then((result) => {
        return result.rows;
    });
};
exports.fetchEventsByFilter = fetchEventsByFilter;
const addEvent = (firebase_id, category, date, time, duration, gender, skills_level, location, needed_players, age_group, cost) => {
    return connection_1.default.query(`INSERT INTO events
        (firebase_id, category, date, time, duration, gender,
        skills_level, location, needed_players, age_group, cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *;`, [firebase_id, category, date, time, duration, gender,
        skills_level, location, needed_players, age_group, cost])
        .then(({ rows }) => {
        return rows[0];
    })
        .catch((err) => {
        next(err);
    });
};
exports.addEvent = addEvent;
const fetchEventById = (event_id) => {
    if (isNaN(Number(event_id))) {
        return Promise.reject({
            status: 400,
            msg: `Invalid event ID ${event_id}`
        });
    }
    return connection_1.default.query(`SELECT *
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
