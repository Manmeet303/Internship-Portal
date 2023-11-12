"use strict";
const {
    Internship,
    AddInternship,
    UpdateInternship,
    RemoveInternship,
} = require("../controllers/Internship");
const { companyRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.get("/", Internship);
    fastify.post("/Add", { beforeHandler: [companyRoute] }, AddInternship);
    fastify.put("/Update", { beforeHandler: [companyRoute] }, UpdateInternship);
    fastify.delete(
        "/Remove",
        { beforeHandler: [companyRoute] },
        RemoveInternship
    );
    done();
};
