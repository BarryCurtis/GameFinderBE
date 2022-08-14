"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_controllers_1 = require("../controllers/users-controllers");
const events_controllers_1 = require("../controllers/events-controllers");
const comments_controllers_1 = require("../controllers/comments-controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Find My Game");
});
app.get("/api/events", events_controllers_1.getEvents);
app.get("/api/events/:event_id", events_controllers_1.getEventById);
app.get("/api/users/:user_id", users_controllers_1.getUserById);
app.get("/api/events/:event_id/comments", comments_controllers_1.getCommentsByEventsId);
app.get("/api/user/:user_id/events", users_controllers_1.getUserEvents);
app.post("/api/users", users_controllers_1.postUser);
app.post("/api/events", events_controllers_1.postEvent);
app.post("/api/events/:event_id/comments", comments_controllers_1.postCommentByEventId);
app.post("/api/user/events", users_controllers_1.postUserEvents);
app.patch("/api/events/:event_id", events_controllers_1.patchEvent);
app.patch("/api/users", users_controllers_1.patchUser);
app.delete("/api/events/:event_id", events_controllers_1.deleteEvent);
app.use("*", (req, res) => {
    res.status(404).send({ msg: "404 no such route" });
});
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
});
exports.default = app;
