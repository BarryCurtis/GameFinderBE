"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExist = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const checkExist = (tableName, coloumn, value) => {
    const queryStr = (0, pg_format_1.default)("SELECT * FROM %I WHERE %I = $1", tableName, coloumn);
    return connection_1.default.query(queryStr, [value]).then((outPutData) => {
        if (!outPutData.rowCount) {
            return Promise.reject({
                status: 404,
                msg: `${value} does not exist`,
            });
        }
        return outPutData;
    });
};
exports.checkExist = checkExist;
