import { NextFunction, Request, Response } from "express";
import {fetchEvents, fetchEventsByFilter, addEvent} from "../models/events-models"

export const getEvents = (req:Request, res:Response, next:NextFunction) => {
    return fetchEvents()
    .then((events) =>{
        res.status(200).send({events: events});
    })
    .catch((err)=> {
        next(err);
    });
}

export const getEventsByFilter = (req:Request, res:Response, next:NextFunction) => {
    return fetchEventsByFilter()
    .then((events) => {
        res.status(200).send({events: events});
    })
    .catch((err)=>{
        next(err);
    })
}

export const postEvent = (req:Request, res:Response, next:NextFunction) => {
    const {firebase_id, category, date, time, duration, gender,
        skills_level, location, needed_players, age_group, cost} = req.body;
    addEvent(firebase_id, category, date, time, duration, gender,
        skills_level, location, needed_players, age_group, cost)
    .then(events => {
        res.status(201).send(events);
    })
    .catch((err)=>{
        next(err);
    })
}