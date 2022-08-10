"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = void 0;
const users_models_1 = require("../models/users-models");
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

