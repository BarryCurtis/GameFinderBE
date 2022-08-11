import { NextFunction, Request, Response } from "express";
import { postNewUser, updateUser } from "../models/users-models";

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  return postNewUser(req.body)
    .then((user) => {
      res.status(201).send({ newuser: user });
    })
    .catch((err) => {
      next(err);
    });
};

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
  return updateUser(req.body)
    .then((user) => {
      res.status(200).send({ newuser: user });
    })
    .catch((err) => {
      next(err);
    });
};
