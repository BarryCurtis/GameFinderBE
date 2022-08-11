import db from "../db/connection";

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
