import { NextFunction, Request, Response } from "express";
import { fetchCommentsBYEventsId } from "../models/comments-models";
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
