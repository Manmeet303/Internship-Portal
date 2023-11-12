"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const UserAuthModel = db.model(
    "UserAuth",
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
        languages: { type: Array, required: false, default: [] },
        skills: { type: Array, required: false, default: [] },
        projects: { type: Array, required: false, default: [] },
        experience: { type: Array, required: false, default: [] },
        education: { type: Array, required: false, default: [] },
        certifications: { type: Array, required: false, default: [] },
        accomplishments: { type: Array, required: false, default: [] },
        jobApplication: { type: Array, required: false, default: [] },
        internshipApplication: { type: Array, required: false, default: [] },
        placementApplication: { type: Array, required: false, default: [] },
        prevJobApplication: { type: Array, required: false, default: [] },
        prevInternshipApplication: {
            type: Array,
            required: false,
            default: [],
        },
        prevPlacementApplication: { type: Array, required: false, default: [] },
        notifications: { type: Array, required: false, default: [] },
        isVerified: { type: Boolean, required: false, default: false },
    }),
    "UserAuth"
);

module.exports = UserAuthModel;
