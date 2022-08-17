import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { patchUser, postUser, getUserById, postUserEvents, getUserEvents} from "../controllers/users-controllers";

import { getEndpoints } from "../controllers/getEndPoints";

import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent,
  deleteEvent
} from "../controllers/events-controllers";
import {
  getCommentsByEventsId,
  postCommentByEventId,
} from "../controllers/comments-controllers";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", getEndpoints);
app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEventById);
app.get("/api/users/:user_id", getUserById);
app.get("/api/events/:event_id/comments", getCommentsByEventsId);
app.get("/api/user/:user_id/events", getUserEvents)

app.post("/api/users", postUser);
app.post("/api/events", postEvent);

app.post("/api/events/:event_id/comments",postCommentByEventId);
app.post("/api/user/events",postUserEvents)


app.patch("/api/events/:event_id", patchEvent);
app.patch("/api/users", patchUser);

app.delete("/api/events/:event_id", deleteEvent)

app.use("*", (req: Request, res: Response) => {
  res.status(404).send({ msg: "404 no such route" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

export default app;
