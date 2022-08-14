"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEvents = exports.postUserEvents = exports.patchUser = exports.postUser = exports.getUserById = void 0;
const users_models_1 = require("../models/users-models");
const getUserById = (req, res, next) => {
    const { user_id } = req.params;
    (0, users_models_1.fetchUserById)(user_id)
        .then((user) => {
        res.status(200).send({ user });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getUserById = getUserById;
const postUser = (req, res, next) => {
    return (0, users_models_1.postNewUser)(req.body)
        .then((user) => {
        res.status(201).send({ newuser: user });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postUser = postUser;
const patchUser = (req, res, next) => {
    return (0, users_models_1.updateUser)(req.body)
        .then((user) => {
        res.status(200).send({ newuser: user });
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchUser = patchUser;
const postUserEvents = (req, res, next) => {
    const { event_id, firebase_id } = req.body;
    return (0, users_models_1.bookEvent)(firebase_id, event_id)
        .then((event) => {
        res.status(201).send({ event });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postUserEvents = postUserEvents;
const getUserEvents = (req, res, next) => {
    const { user_id } = req.params;
    return (0, users_models_1.fetchUserEvents)(user_id)
        .then((userEvents) => {
        res.status(200).send({ userEvents });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getUserEvents = getUserEvents;
