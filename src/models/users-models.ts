import db from "../db/connection";

export const postNewUser = (body) => {
  return db
    .query(
      `INSERT INTO users
        (firebase_id, name, username, age, gender, profile_icon, skills_level, rating, event_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING * ;
        `,
      [
        body.firebase_id,
        body.name,
        body.username,
        body.age,
        body.gender,
        body.profile_icon,
        body.skills_level,
        body.rating,
        body.event_id,
      ]
    )
    .then((newUser) => {
      return newUser.rows[0];
    })
    .catch((err) => console.log(err));
};
