"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCommentsBYEventsId = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchCommentsBYEventsId = (event_id) => {
    if (isNaN(Number(event_id))) {
        return Promise.reject({
            status: 400,
            msg: `invalid event id ${event_id}`,
        });
    }
    return connection_1.default
        .query("SELECT * FROM comments WHERE event_id = $1", [event_id])
        .then((reslut) => {
        if (!reslut.rowCount) {
            return Promise.reject({
                status: 404,
                msg: `event id ${event_id} does not exist`,
            });
        }
        return reslut.rows;
    });
};
exports.fetchCommentsBYEventsId = fetchCommentsBYEventsId;
