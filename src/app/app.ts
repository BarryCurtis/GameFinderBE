import express, { application } from "express";
import cors from "cors";

import { patchUser, postUser, getUserById, postUserEvents} from "../controllers/users-controllers";

import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent
} from "../controllers/events-controllers";
import { getCommentsByEventsId,postCommentByEventId } from "../controllers/comments-controllers";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEventById);
app.get("/api/users/:user_id", getUserById)
app.get("/api/events/:event_id/comments", getCommentsByEventsId);

app.post("/api/users", postUser);
app.post("/api/events", postEvent);
app.post("/api/events/:event_id/comments",postCommentByEventId);
app.post("/api/user/events",postUserEvents)

app.patch("/api/events/:event_id", patchEvent);
app.patch("/api/users", patchUser);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "404 no such route" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

export default app;
