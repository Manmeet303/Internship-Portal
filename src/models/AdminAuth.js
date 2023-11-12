"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const AdminAuthModel = db.model(
    "AdminAuth",
    new mongooseSchema({
        avatar: { type: String, required: false, default: undefined },
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobile: { type: Number, required: true },
        personal: {
            dob: { type: Date, required: false, default: undefined },
            gender: { type: String, required: false, default: undefined },
            address: { type: String, required: false, default: undefined },
            city: { type: String, required: false, default: undefined },
            state: { type: String, required: false, default: undefined },
            country: { type: String, required: false, default: undefined },
        },
    }),
    "AdminAuth"
);

module.exports = AdminAuthModel;
