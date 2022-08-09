import db from "../db/connection";

export const fetchEvents = () => {
  return db.query(`SELECT * FROM events`).then((result) => {

    return result.rows;
  });
};

