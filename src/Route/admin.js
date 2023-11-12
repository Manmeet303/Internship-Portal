"use strict";
const {
    Profile,
    GetQuery,
    GetResolvedQuery,
    SubmitQuery,
    MarkQueryResolved,
} = require("../controllers/Admin");
const { adminRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.get("/Profile", Profile);
    fastify.get("/Query", { beforeHandler: [adminRoute] }, GetQuery);
    fastify.get(
        "/QueryResolved",
        { beforeHandler: [adminRoute] },
        GetResolvedQuery
    );
    fastify.post("/Query", SubmitQuery);
    fastify.post(
        "/ResolveQuery",
        { beforeHandler: [adminRoute] },
        MarkQueryResolved
    );
    done();
};
