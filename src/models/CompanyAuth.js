"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const CompanyAuthModel = db.model(
    "CompanyAuth",
    new mongooseSchema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        logo: { type: String, required: false, default: undefined },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        type: { type: String, required: true },
        about: { type: String, required: true },
        projects: { type: Array, required: false, default: [] },
        achievements: { type: Array, required: false, default: [] },
        images: { type: Array, required: false, default: [] },
    }),
    "CompanyAuth"
);

module.exports = CompanyAuthModel;
