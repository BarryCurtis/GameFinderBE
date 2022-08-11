"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUser = exports.postUser = exports.getUserById = void 0;
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
