"use strict";
const pg_1 = require("pg");
require('dotenv').config({
    path: `${__dirname}/../../.env`,
});
module.exports = new pg_1.Pool();
