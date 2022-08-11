"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByEventsId = void 0;
const comments_models_1 = require("../models/comments-models");
const getCommentsByEventsId = (req, res, next) => {
    const { event_id } = req.params;
    (0, comments_models_1.fetchCommentsBYEventsId)(event_id)
        .then((comments) => {
        res.status(200).send({ comments });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getCommentsByEventsId = getCommentsByEventsId;
