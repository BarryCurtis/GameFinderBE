"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueries = void 0;
const validateQueries = (query, validQueries) => {
    const entries = Object.entries(query);
    return validQueries.some((q) => {
        return entries.flat().includes(q);
    });
};
exports.validateQueries = validateQueries;
