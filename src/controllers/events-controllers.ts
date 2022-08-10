import { NextFunction, Request, Response } from "express";
import {fetchEvents, fetchEventsByFilter} from "../models/events-models"

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
