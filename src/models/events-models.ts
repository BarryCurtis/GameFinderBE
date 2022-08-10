import { ReadyForQueryMessage } from "pg-protocol/dist/messages";
import db from "../db/connection";

export const fetchEvents = () => {
  return db.query(`SELECT * FROM events`).then((result) => {

    return result.rows;
  });
};

export const fetchEventsByFilter = (sort_by = "time", order = "DESC", filter) => {

    const event_columns = [
    "event_id",
    "firebase_id",
    "category",
    "date",
    "time",
    "duration",
    "gender",
    "skills_level",
    "location",
    "needed_players",
    "age_group",
    "cost",
    ];

    const filter_columns = 
    ["gender", "category", "age_group"];

    if (!event_columns.includes(sort_by)) {
        return Promise.reject({status:400, msg: "Sort by query invalid"})
    }
    if (!["ASC", "DESC", "asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Order by query invalid" });
  }

  let queryStr = "";

  if (!filter){queryStr.concat(sort_by, order)}
  else {queryStr.concat(sort_by, order, filter)}


  


    return db.query(`SELECT * FROM event`).then((result) =>{
        return result.rows;
    })
}