"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const InstituteAuthModel = db.model(
    "InstituteAuth",
    new mongooseSchema({
        avatar: { type: String, required: false, default: undefined },
        name: { type: String, equired: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: false, default: undefined },
        city: { type: String, required: false, default: undefined },
        state: { type: String, required: false, default: undefined },
        country: { type: String, required: false, default: undefined },
        mobile: {
            type: Number,
            required: false,
            minlength: 10,
            maxlength: 10,
            default: null,
        },
        about: { type: String, required: true },
        courseOffered: { type: Array, required: false, default: [] },
        achievements: { type: Array, required: false, default: [] },
        images: { type: Array, required: false, default: [] },
    }),
    "InstituteAuth"
);

module.exports = InstituteAuthModel;
