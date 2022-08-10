"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEvent = exports.getEventById = exports.getEventsByFilter = exports.getEvents = void 0;
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
const getEventById = (req, res, next) => {
    const { event_id } = req.params;
    (0, events_models_1.fetchEventById)(event_id)
        .then((event) => {
        res.status(200).send({ event });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getEventById = getEventById;
const postEvent = (req, res, next) => {
    const { firebase_id, category, date, time, duration, gender, skills_level, location, needed_players, age_group, cost } = req.body;
    (0, events_models_1.addEvent)(firebase_id, category, date, time, duration, gender, skills_level, location, needed_players, age_group, cost)
        .then(events => {
        res.status(201).send(events);
    })
        .catch((err) => {
        next(err);
    });
};
exports.postEvent = postEvent;
