import { NextFunction, Request, Response } from "express";
import { fetchEvents, fetchEventById, addEvent } from "../models/events-models";

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;
  return fetchEvents(query)
    .then((events) => {
      res.status(200).send({ events: events });
    })
    .catch((err) => {
      next(err);
    });
};

export const getEventById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.params;
  fetchEventById(event_id)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch((err) => {
      next(err);
    });
};

export const postEvent = (req: Request, res: Response, next: NextFunction) => {
  const {
    firebase_id,
    category,
    date,
    time,
    duration,
    gender,
    skills_level,
    location,
    needed_players,
    age_group,
    cost,
  } = req.body;
  addEvent(
    firebase_id,
    category,
    date,
    time,
    duration,
    gender,
    skills_level,
    location,
    needed_players,
    age_group,
    cost
  )
    .then((events) => {
      res.status(201).send(events);
    })
    .catch((err) => {
      next(err);
    });
};
