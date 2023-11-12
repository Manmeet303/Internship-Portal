"use strict";
const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const OID = require("mongoose").Types.ObjectId;

const EventModel = db.model(
    "Event",
    new mongooseSchema({
        companyId: { type: OID, required: true },
        title: { type: String, required: true },
        address: { type: String, required: true },
        date: { type: Date, required: true },
        isPaid: { type: Boolean, required: true },
        payAmount: { type: Number, required: false, default: 0, min: 0 },
        description: { type: String, required: true },
        targetAudience: { type: String, required: true },
    }),
    "Event"
);

module.exports = EventModel;
