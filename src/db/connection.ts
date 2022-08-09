import {Pool} from "pg";


require('dotenv').config({
    path: `${__dirname}/../../.env`,
  });

export = new Pool()