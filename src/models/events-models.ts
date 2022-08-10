import db from "../db/connection";

export const fetchEvents = () => {
  return db.query(`SELECT * FROM events`).then((result) => {
    return result.rows;
  });
};

export const fetchEventsByFilter = (sort_by = "time", order = "ASC", sport = "football", gender = "male", age_group = "18-30") => {

    const selected_sort = ["ASC", "DESC", "asc", "desc"];
    const selected_sport = ["football", "netball", "squash"];
    const selected_gender = ["male", "female", "mixed"];
    const selected_age_group = ["18-30", "30-50", "50+"];

  let queryStr = `SELECT events.* FROM events WHERE category = $1
 AND gender = $2 AND age_group = $3
 ORDER BY ${sort_by} ${order}`
  
  return db.query(`${queryStr}`, [sport, gender, age_group]).then((result) =>{
      return result.rows;
    })


    
}