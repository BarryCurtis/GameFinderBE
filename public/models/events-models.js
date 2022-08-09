"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEvents = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchEvents = () => {
    return connection_1.default.query(`SELECT * FROM events`).then((result) => {
        return result.rows;
    });
};
exports.fetchEvents = fetchEvents;
