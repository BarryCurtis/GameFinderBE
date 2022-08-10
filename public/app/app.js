"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_controllers_1 = require("../controllers/users-controllers");
const events_controllers_1 = require("../controllers/events-controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get('/api/events', events_controllers_1.getEvents);
app.get('/api/events/filtered', events_controllers_1.getEventsByFilter);
app.get('/api/events/:event_id', events_controllers_1.getEventById);
app.post("/api/users/", users_controllers_1.postUser);
app.post("/api/events", events_controllers_1.postEvent);
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
});
exports.default = app;
