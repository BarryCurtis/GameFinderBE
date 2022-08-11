import { NextFunction, Request, Response } from "express";
import {
  fetchCommentsBYEventsId,
  addCommentBYEventsId,
} from "../models/comments-models";

export const getCommentsByEventsId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.params;
  fetchCommentsBYEventsId(event_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

export const postCommentByEventId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.params;
  const { firebase_id, comment_body, comment_time } =
    req.body;
  addCommentBYEventsId(
    event_id,
    firebase_id,
    comment_body,
    comment_time
  )
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
