import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import {
  patchUser,
  postUser,
  getUserById,
} from "../controllers/users-controllers";

import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent,
} from "../controllers/events-controllers";
import {
  getCommentsByEventsId,
  postCommentByEventId,
} from "../controllers/comments-controllers";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Find My Game");
});

app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEventById);
app.get("/api/users/:user_id", getUserById);
app.get("/api/events/:event_id/comments", getCommentsByEventsId);

app.post("/api/users", postUser);
app.post("/api/events", postEvent);
app.post("/api/events/:event_id/comments", postCommentByEventId);

app.patch("/api/events/:event_id", patchEvent);
app.patch("/api/users", patchUser);

app.use("*", (req: Request, res: Response) => {
  res.status(404).send({ msg: "404 no such route" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

export default app;
