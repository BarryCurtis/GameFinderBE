import db from "../db/connection";
import format from "pg-format";
export const checkExist = (tableName: String, column: String, value: any) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1", tableName, column);
  return db.query(queryStr, [value]).then((outPutData) => {
    if (!outPutData.rowCount) {
      return Promise.reject({
        status: 404,
        msg: `${value} does not exist`,
      });
    }
    return outPutData;
  });
};
