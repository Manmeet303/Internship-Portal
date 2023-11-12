"use strict";
const {
    UpdatePassword,
    Profile,
    UpdateProfile,
    DeleteUser,
    ApplyInternship,
    WithdrawInternship,
    ApplyPlacement,
    WithdrawPlacement,
    ApplyJob,
    WithdrawJob,
} = require("../controllers/User");
const { userRoute } = require("../middleware/RouteAuth");
module.exports = function (fastify, opts, done) {
    fastify.put(
        "/UpdatePassword",
        { beforeHandler: [userRoute] },
        UpdatePassword
    );
    fastify.get("/Profile", Profile);
    fastify.put(
        "/UpdateProfile",
        { beforeHandler: [userRoute] },
        UpdateProfile
    );
    fastify.delete(
        "/RemoveProfile",
        { beforeHandler: [userRoute] },
        DeleteUser
    );
    fastify.put(
        "/Internship/Apply",
        { beforeHandler: [userRoute] },
        ApplyInternship
    );
    fastify.put(
        "/Internship/Withdraw",
        { beforeHandler: [userRoute] },
        WithdrawInternship
    );
    fastify.put(
        "/Placement/Apply",
        { beforeHandler: [userRoute] },
        ApplyPlacement
    );
    fastify.put(
        "/Placement/Withdraw",
        { beforeHandler: [userRoute] },
        WithdrawPlacement
    );
    fastify.put("/Job/Apply", { beforeHandler: [userRoute] }, ApplyJob);
    fastify.put("/Job/Withdraw", { beforeHandler: [userRoute] }, WithdrawJob);
    done();
};
