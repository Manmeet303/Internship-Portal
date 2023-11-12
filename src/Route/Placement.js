"use strict";
const {
    Placement,
    AddPlacement,
    UpdatePlacement,
    RemovePlacement,
} = require("../controllers/Placement");
const { companyRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.get("/", Placement);
    fastify.post("/Add", { beforeHandler: [companyRoute] }, AddPlacement);
    fastify.put("/Update", { beforeHandler: [companyRoute] }, UpdatePlacement);
    fastify.delete(
        "/Remove",
        { beforeHandler: [companyRoute] },
        RemovePlacement
    );
    done();
};
