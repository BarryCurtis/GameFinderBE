import data from "./data/index";
import seed from "./seed";
import db from "./connection";

seed(data).then(() => db.end());