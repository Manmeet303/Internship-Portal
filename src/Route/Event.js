"use strict";
const {
    Event,
    AddEvent,
    UpdateEvent,
    RemoveEvent,
} = require("../controllers/Event");
const { adminRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.get("/", Event);
    fastify.post("/Add", { beforeHandler: [adminRoute] }, AddEvent);
    fastify.put("/Update", { beforeHandler: [adminRoute] }, UpdateEvent);
    fastify.delete("/Remove", { beforeHandler: [adminRoute] }, RemoveEvent);
    done();
};
