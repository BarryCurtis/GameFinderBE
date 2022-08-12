import { NextFunction, Request, Response } from "express";

import { postNewUser, updateUser, fetchUserById, bookEvent } from "../models/users-models";

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  fetchUserById(user_id)
  .then((user)=> {
    res.status(200).send({user});
  })
  .catch((err)=> {
    next(err)
  })
}

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

export const postUserEvents = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {event_id, firebase_id} = req.body
  return bookEvent(firebase_id, event_id).then((event:any) => {
    res
      .status(201)
      .send({ event })
  }).catch((err:any) => {
    console.log(err);
  });
};