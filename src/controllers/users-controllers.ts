import { NextFunction, Request, Response } from "express";
import { postNewUser, fetchUserById } from "../models/users-models";

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
