"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const events_controllers_1 = require("../public/controllers/events-controllers");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/events', events_controllers_1.getEvents);
app.get('/api/events/filtered', events_controllers_1.getEventsByFilter);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
exports["default"] = app;
module.exports = exports["default"];
