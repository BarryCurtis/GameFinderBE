import {Pool} from "pg";
import dotenv from 'dotenv';
let config = {};
if (process.env.NODE_ENV === "production")
{config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },}}
else
{dotenv.config({
    path: `${__dirname}/../../.env`,
  });
config = {}}


  
export = new Pool(config)