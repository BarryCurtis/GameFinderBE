import express from "express";
import cors from "cors";

import { postUser } from "../controllers/users-controllers";

import {
  getEvents,
  getEventsByFilter,
  postEvent,
} from "../controllers/events-controllers";
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/events", getEvents);
app.get("/api/events/filtered", getEventsByFilter);

app.post("/api/users/", postUser);

app.post("/api/events", postEvent);
export default app;
