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



exports.fetchEvents = async (
  sort_by = "category",
  order = "desc",
  filter = null
) => {
  const validSort_by = [
    "category",
    "gender",
    "",
    "",
  ];
  const validOrder = ["ASC", "DESC", "asc", "desc"];
  if (!validSort_by.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: `cannot sort by ${sort_by}`,
    });
  }
  if (!validOrder.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: `cannot sort by ${order}`,
    });
  }
  const topicValidate = await connection.query(
    `SELECT * FROM topics WHERE slug = $1`,
    [topic]
  );
  if (topic) {
    if (topicValidate.rowCount === 0) {
      return Promise.reject({
        status: 400,
        msg: `cannot sort by ${topic}`,
      });
    } else {
      return connection.query(
        `SELECT articles.*, COUNT(comments.article_id)::INT
        AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        WHERE topic = $1
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`,
        [topic]
      ).then((result)=> {
        return result.rows
      })
    }
  } else {
    return connection.query(
      `SELECT articles.*, COUNT(comments.article_id)::INT
      AS comment_count
      FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order}`
    ).then((result)=> {
      return result.rows
  })
  }}