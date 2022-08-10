"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
let config = {};
if (process.env.NODE_ENV === "production") {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
}
else {
    dotenv_1.default.config({
        path: `${__dirname}/../../.env`,
    });
    config = {};
}
module.exports = new pg_1.Pool(config);
