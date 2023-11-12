"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const OID = require("mongoose").Types.ObjectId;

const PlacementModel = db.model(
    "Placement",
    new mongooseSchema({
        companyId: { type: OID, required: true },
        position: { type: String, required: true },
        pastExperienceDuration: { type: Number, required: true },
        cgpaRequirement: { type: Number, required: true },
        locations: { type: Array, required: true },
        expectedSalary: { type: Number, required: true },
        benefits: { type: Array, required: true },
        skills: { type: Array, required: true },
        responsibility: { type: Array, required: true },
        description: { type: String, required: true },
        positionType: {
            type: String,
            required: true,
            enum: ["Full Time", "Part Time", "Freelance"],
        },
        allowWFH: { type: Boolean, required: true },
        applicants: { type: Array, required: false, default: [] },
        approvedApplicants: { type: Array, required: false, default: [] },
    }),
    "Placement"
);

module.exports = PlacementModel;
