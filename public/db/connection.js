"use strict";
const pg_1 = require("pg");
module.exports = new pg_1.Pool({ PGDATABASE: "find_game_development", PGUSER: "barry", PGPASSWORD: "psqlKremena" });
