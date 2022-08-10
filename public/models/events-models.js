"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEventsByFilter = exports.fetchEvents = void 0;
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
