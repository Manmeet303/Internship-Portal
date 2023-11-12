"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const QueryModel = db.model(
    "Query",
    new mongooseSchema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: Number, required: true, minlength: 10, maxlength: 10 },
        description: { type: String, required: true },
        date: { type: Number, required: false, default: Date.now() },
        resolveDate: { type: Number, required: false, default: null },
        resolved: { type: Boolean, required: false, default: false },
        solution: { type: String, required: false, default: "" },
    }),
    "Query"
);

module.exports = QueryModel;
