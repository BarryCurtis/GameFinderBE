import db from "../db/connection";
import { checkExist } from "../utiles/checkExist";
export const fetchCommentsBYEventsId = (event_id) => {
  if (isNaN(Number(event_id))) {
    return Promise.reject({
      status: 400,
      msg: `invalid event id ${event_id}`,
    });
  }
  return db
    .query("SELECT * FROM comments WHERE event_id = $1", [event_id])
    .then((reslut) => {
      if (!reslut.rowCount) {
        return Promise.reject({
          status: 404,
          msg: `event id ${event_id} does not exist`,
        });
      }
      return reslut.rows;
    });
};

export const addCommentBYEventsId = (
  event_id,
  firebase_id,
  comment_body,
  comment_time
) => {
  console.log(event_id, firebase_id, comment_body, comment_time);
  if (comment_body === "") {
    return Promise.reject({
      status: 400,
      msg: `cannot post empty comment`,
    });
  }
  return checkExist("events", "event_id", event_id).then(() => {
    return db
      .query(
        `INSERT INTO comments
        (event_id, firebase_id, comment_body, comment_time) VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [event_id, firebase_id, comment_body, comment_time]
      )
      .then((result) => {
        return result.rows[0];
      });
  });
};
