import express from "express";
import cors from "cors";
import {
  getEvents,
  getEventsByFilter,
} from "../controllers/events-controllers";

import { postUser } from "../controllers/users-controllers";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/events", getEvents);
app.get("/api/events/filtered", getEventsByFilter);

app.post("/api/users/", postUser);

export default app;
