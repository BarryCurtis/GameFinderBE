import {fetchEvents} from "../models/events-models"

export const getEvents = (req, res, next) => {
    return fetchEvents()
    .then((events) =>{
        res.status(200).send({events: events});
    })
    .catch((err)=> {
        next(err);
    });
}