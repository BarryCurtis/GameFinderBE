"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentByEventId = exports.getCommentsByEventsId = void 0;
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
const postCommentByEventId = (req, res, next) => {
    const { event_id } = req.params;
    const { firebase_id, comment_body, comment_time } = req.body;
    (0, comments_models_1.addCommentBYEventsId)(event_id, firebase_id, comment_body, comment_time)
        .then((comment) => {
        res.status(201).send({ comment });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postCommentByEventId = postCommentByEventId;
