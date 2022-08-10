"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsByFilter = exports.getEvents = void 0;
const events_models_1 = require("../models/events-models");
const getEvents = (req, res, next) => {
    return (0, events_models_1.fetchEvents)()
        .then((events) => {
        res.status(200).send({ events: events });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getEvents = getEvents;
const getEventsByFilter = (req, res, next) => {
    return (0, events_models_1.fetchEventsByFilter)()
        .then((events) => {
        res.status(200).send({ events: events });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getEventsByFilter = getEventsByFilter;
exports.fetchEvents = (sort_by = "category", order = "desc", filter = null) => __awaiter(void 0, void 0, void 0, function* () {
    const validSort_by = [
        "category",
        "gender",
        "",
        "",
    ];
    const validOrder = ["ASC", "DESC", "asc", "desc"];
    if (!validSort_by.includes(sort_by)) {
        return Promise.reject({
            status: 400,
            msg: `cannot sort by ${sort_by}`,
        });
    }
    if (!validOrder.includes(order)) {
        return Promise.reject({
            status: 400,
            msg: `cannot sort by ${order}`,
        });
    }
    const topicValidate = yield connection.query(`SELECT * FROM topics WHERE slug = $1`, [topic]);
    if (topic) {
        if (topicValidate.rowCount === 0) {
            return Promise.reject({
                status: 400,
                msg: `cannot sort by ${topic}`,
            });
        }
        else {
            return connection.query(`SELECT articles.*, COUNT(comments.article_id)::INT
        AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        WHERE topic = $1
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`, [topic]).then((result) => {
                return result.rows;
            });
        }
    }
    else {
        return connection.query(`SELECT articles.*, COUNT(comments.article_id)::INT
      AS comment_count
      FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order}`).then((result) => {
            return result.rows;
        });
    }
});
