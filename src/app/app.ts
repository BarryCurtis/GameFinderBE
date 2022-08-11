import express from "express";
import cors from "cors";
import { postUser } from "../controllers/users-controllers";
import {
  getEvents,
  getEventById,
  postEvent,
} from "../controllers/events-controllers";
import {getCommentsByEventsId,} from '../controllers/comments-controllers'

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('/api/events', getEvents);
app.get('/api/events/:event_id', getEventById);
app.post("/api/users/", postUser);
app.post("/api/events", postEvent);
app.get("/api/events/comments/:event_id", getCommentsByEventsId)
app.use("*", (req, res) => {
  res.status(404).send({ msg: "404 no such route" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

export default app;
