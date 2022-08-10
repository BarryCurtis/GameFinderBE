import {Pool} from "pg";


import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../../.env`,
  });

  const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
export = new Pool(config)