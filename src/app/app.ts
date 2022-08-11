import express, { application } from "express";
import cors from "cors";
import { postUser } from "../controllers/users-controllers";
import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent
} from "../controllers/events-controllers";

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
app.patch("/api/events/:event_id", patchEvent);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "404 no such route" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

export default app;
