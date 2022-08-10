import {fetchEvents, fetchEventsByFilter} from "../models/events-models"

export const getEvents = (req, res, next) => {
    return fetchEvents()
    .then((events) =>{
        res.status(200).send({events: events});
    })
    .catch((err)=> {
        next(err);
    });
}

export const getEventsByFilter = (req, res, next) => {
    return fetchEventsByFilter()
    .then((events) => {
        res.status(200).send({events: events});
    })
    .catch((err)=>{
        next(err);
    })
}
