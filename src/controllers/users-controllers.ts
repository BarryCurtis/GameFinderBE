import { NextFunction, Request, Response } from "express";
import { postNewUser } from "../models/users-models";

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  return postNewUser(req.body)
    .then((user) => {
      res.status(201).send({ newuser: user });
    })
    .catch((err) => {
      next(err);
    });
};
