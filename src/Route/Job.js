"use strict";
const { Job, AddJob, UpdateJob, RemoveJob } = require("../controllers/Job");
const { companyRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.get("/", Job);
    fastify.post("/Add", { beforeHandler: [companyRoute] }, AddJob);
    fastify.put("/Update", { beforeHandler: [companyRoute] }, UpdateJob);
    fastify.delete("/Remove", { beforeHandler: [companyRoute] }, RemoveJob);
    done();
};
