import db from "../db/connection";
import { validateQueries } from "../utils/validateQueries";
import Sportevent from "../db/data/events-test";
import { Query } from "../utils/validateQueries";

export const fetchEvents = (query: Query) => {
  const validQueries = [
    "football",
    "netball",
    "squash",
    "male",
    "female",
    "mixed",
    "18-30",
    "30-50",
    "50+",
    "ASC",
    "DESC",
    "asc",
    "desc",
  ];

  let queryStr = "SELECT * FROM events WHERE 1 = 1";

  if (query && validateQueries(query, validQueries)) {
    if (Object.keys(query).includes("category")) {
      queryStr += ` AND category = '${query.category}'`;
    }
  }
  if (query && validateQueries(query, validQueries)) {
    if (Object.keys(query).includes("age_group")) {
      queryStr += ` AND age_group = '${query.age_group}'`;
    }
  }
  if (query && validateQueries(query, validQueries)) {
    if (Object.keys(query).includes("gender")) {
      queryStr += ` AND gender = '${query.gender}'`;
    }
  }

  if (query.order && validQueries.includes(query.order)) {
    queryStr += ` ORDER BY time ${query.order}`;
  } else if (!query.order) {
    queryStr += ` ORDER BY time ASC`;
  }

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

export const addEvent = (
  firebase_id: string,
  category: string,
  date: string,
  time: string,
  duration: number,
  gender: string,
  skills_level: number,
  location: string,
  needed_players: number,
  age_group: string,
  cost: number
) => {
  if (
    !firebase_id ||
    !category ||
    !date ||
    !time ||
    !duration ||
    !gender ||
    !skills_level ||
    !location ||
    !needed_players ||
    !age_group ||
    !cost
  ) {
    return Promise.reject({
      status: 400,
      msg: `Invalid object passed, please use format:
        {
  firebase_id: string,
  category: string,
  date: string,
  time: string,
  duration: number,
  gender: string,
  skills_level: number,
  location: string,
  needed_players: number,
  age_group: string,
  cost: number
}
`,
    });
  }
  return db
    .query(
      `INSERT INTO events
        (firebase_id, category, date, time, duration, gender,
        skills_level, location, needed_players, age_group, cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *;`,
      [
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
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

export const fetchEventById = (event_id: string) => {
  if (isNaN(Number(event_id))) {
    return Promise.reject({
      status: 400,
      msg: `Invalid event ID ${event_id}`,
    });
  }
  return db
    .query(
      `SELECT *
    FROM events
    WHERE events.event_id = $1 
    `,
      [event_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Event not found for event_id: ${event_id}`,
        });
      }
      return result.rows[0];
    });
};

export const updateEvent = (updatedEvent: Sportevent) => {
  if (
    !updatedEvent.firebase_id ||
    !updatedEvent.category ||
    !updatedEvent.date ||
    !updatedEvent.time ||
    !updatedEvent.duration ||
    !updatedEvent.gender ||
    !updatedEvent.skills_level ||
    !updatedEvent.location ||
    !updatedEvent.needed_players ||
    !updatedEvent.age_group ||
    !updatedEvent.cost
  ) {
    return Promise.reject({
      status: 400,
      msg: `Invalid object passed, please use format:
        {
  firebase_id: string,
  category: string,
  date: string,
  time: string,
  duration: number,
  gender: string,
  skills_level: number,
  location: string,
  needed_players: number,
  age_group: string,
  cost: number
}
`,
    });
  }
  return db
    .query(
      `UPDATE events 
      SET category = $1, date = $2, time = $3, duration = $4, gender = $5, skills_level = $6, location = $7, needed_players = $8, age_group = $9, cost = $10
    WHERE event_id = $11 RETURNING *`,
      [
        updatedEvent.category,
        updatedEvent.date,
        updatedEvent.time,
        updatedEvent.duration,
        updatedEvent.gender,
        updatedEvent.skills_level,
        updatedEvent.location,
        updatedEvent.needed_players,
        updatedEvent.age_group,
        updatedEvent.cost,
        updatedEvent.event_id,
      ]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Event doesn't exist, please try again",
        });
      }
      return result.rows[0];
    });
};

export const removeEvent = (event_id: String) => {
  return db
    .query("DELETE FROM userevents WHERE event_id = $1", [event_id])
    .then((result) => {
      return result.rows;
    });
};
