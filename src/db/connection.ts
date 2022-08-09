import {Pool} from "pg";


import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../../.env`,
  });

export = new Pool()