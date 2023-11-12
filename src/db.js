"use strict";
const mongoose = require("mongoose");

const db = mongoose.createConnection(require("./config/db.config").url);

module.exports = db;
