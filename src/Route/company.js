"use strict";
const {
    List,
    getCompany,
    UpdatePassword,
    Profile,
    UpdateProfile,
    DeleteCompany,
    showInternshipApplicant,
    ApproveInternshipApplicant,
    RejectInternshipApplicant,
    showJobApplicant,
    ApproveJobApplicant,
    RejectJobApplicant,
    showPlacementApplicant,
    ApprovePlacementApplicant,
    RejectPlacementApplicant,
} = require("../controllers/Company");
const { companyRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.get("/", List);
    fastify.get("/Company", getCompany);
    fastify.put(
        "/UpdatePassword",
        { beforeHandler: [companyRoute] },
        UpdatePassword
    );
    fastify.get("/Profile", Profile);
    fastify.put(
        "/UpdateProfile",
        { beforeHandler: [companyRoute] },
        UpdateProfile
    );
    fastify.delete(
        "/RemoveProfile",
        { beforeHandler: [companyRoute] },
        DeleteCompany
    );
    fastify.post(
        "/Internship/Show",
        { beforeHandler: [companyRoute] },
        showInternshipApplicant
    );
    fastify.post(
        "/Internship/Approve",
        { beforeHandler: [companyRoute] },
        ApproveInternshipApplicant
    );
    fastify.post(
        "/Internship/Reject",
        { beforeHandler: [companyRoute] },
        RejectInternshipApplicant
    );
    fastify.post(
        "/Job/Show",
        { beforeHandler: [companyRoute] },
        showJobApplicant
    );
    fastify.post(
        "/Job/Approve",
        { beforeHandler: [companyRoute] },
        ApproveJobApplicant
    );
    fastify.post(
        "/Job/Reject",
        { beforeHandler: [companyRoute] },
        RejectJobApplicant
    );
    fastify.post(
        "/Placement/Show",
        { beforeHandler: [companyRoute] },
        showPlacementApplicant
    );
    fastify.post(
        "/Placement/Approve",
        { beforeHandler: [companyRoute] },
        ApprovePlacementApplicant
    );
    fastify.post(
        "/Placement/Reject",
        { beforeHandler: [companyRoute] },
        RejectPlacementApplicant
    );
    done();
};
