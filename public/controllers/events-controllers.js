"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
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
