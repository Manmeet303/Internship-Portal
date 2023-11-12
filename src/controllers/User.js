"use strict";
const UserAuthModel = require("../models/UserAuth");
const InternshipModel = require("../models/Internship");
const PlacementModel = require("../models/Placement");
const JobModel = require("../models/Job");
const bcrypt = require("bcrypt");
const OId = require("mongoose").Types.ObjectId;
const response = require("../utils/response");
const userProfile = require("../utils/userProfile");

const UpdatePassword = async (req, res, next) => {
    /**
     * BODY: oldPassword, newPassword
     */
    UserAuthModel.findOne({ email: req.session.user.email }, (err, result) => {
        if (err) throw err;
        bcrypt.compare(
            req.body.oldPassword,
            result.password,
            function (err, result1) {
                if (err) throw err;
                if (result1)
                    bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                        if (err) throw err;
                        UserAuthModel.updateOne(
                            { email: req.session.user.email },
                            { password: hash },
                            (err, result2) => {
                                if (err) throw err;
                                if (result2.modifiedCount)
                                    return response(
                                        res,
                                        true,
                                        "Password Update Success"
                                    );
                                else
                                    return response(
                                        res,
                                        false,
                                        "Password Update Failure"
                                    );
                            }
                        );
                    });
                else return response(res, false, "Incorrect Old Password");
            }
        );
    });
};
const Profile = async (req, res, next) => {
    UserAuthModel.findOne(
        { email: req.session.user.email },
        { password: 0 },
        (err, result) => {
            if (err) throw err;
            if (result)
                return response(res, true, "Profile Fetch Success", {
                    type: "S",
                    user: userProfile(result),
                });
            else return response(res, false, "Profile Fetch Failure");
        }
    );
};
const UpdateProfile = async (req, res, next) => {
    /**
     * BODY: Things that are need to be updated.
     */
    UserAuthModel.updateOne(
        { email: req.session.user.email },
        req.body,
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount)
                return response(res, true, "Profile Update Success");
            else return response(res, false, "Profile Update Failure");
        }
    );
};
const DeleteUser = async (req, res, next) => {
    UserAuthModel.findOne({ email: req.session.user.email }, (err, result) => {
        if (err) throw err;
        bcrypt.compare(
            req.body.password,
            result.password,
            function (err, result1) {
                if (err) throw err;
                if (result1)
                    UserAuthModel.deleteOne(
                        { email: req.session.user.email },
                        req.body,
                        (err, result) => {
                            if (err) throw err;
                            if (result.deletedCount)
                                return response(
                                    res,
                                    true,
                                    "Profile Deleted Successfully"
                                );
                            else
                                return response(
                                    res,
                                    false,
                                    "Profile Deletion Failure"
                                );
                        }
                    );
                else return response(res, false, "Incorrect Password");
            }
        );
    });
};
const ApplyJob = async (req, res, next) => {
    /**
     * BODY: jobId
     */
    JobModel.updateOne(
        { _id: OId(req.body.jobId) },
        { $addToSet: { applicants: req.session.user.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                UserAuthModel.updateOne(
                    { _id: OId(req.session.user.userId) },
                    { $addToSet: { jobApplication: req.body.jobId } },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            return response(
                                res,
                                true,
                                "Applied to Job Successfully"
                            );
                        else return response(res, false, "Unable to Apply");
                    }
                );
            else return response(res, false, "Unable to Apply");
        }
    );
};
const WithdrawJob = async (req, res, next) => {
    /**
     * BODY: jobId
     */
    JobModel.updateOne(
        { _id: OId(req.body.jobId) },
        { $pull: { applicants: req.session.user.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                UserAuthModel.updateOne(
                    { _id: OId(req.session.user.userId) },
                    { $pull: { jobApplication: req.body.jobId } },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            return response(
                                res,
                                true,
                                "Withdraw Job Application Success"
                            );
                        else return response(res, false, "Unable to Apply");
                    }
                );
            else return response(res, false, "Unable to Apply");
        }
    );
};
const ApplyPlacement = async (req, res, next) => {
    /**
     * BODY: placementId
     */
    PlacementModel.updateOne(
        { _id: OId(req.body.placementId) },
        { $addToSet: { applicants: req.session.user.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                UserAuthModel.updateOne(
                    { _id: OId(req.session.user.userId) },
                    {
                        $addToSet: {
                            placementApplication: req.body.placementId,
                        },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            return response(
                                res,
                                true,
                                "Applied to Placement Successfully"
                            );
                        else return response(res, false, "Unable to Apply");
                    }
                );
            else return response(res, false, "Unable to Apply");
        }
    );
};
const WithdrawPlacement = async (req, res, next) => {
    /**
     * BODY: placementId
     */
    PlacementModel.updateOne(
        { _id: OId(req.body.placementId) },
        { $pull: { applicants: req.session.user.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                UserAuthModel.updateOne(
                    { _id: OId(req.session.user.userId) },
                    {
                        $pull: {
                            placementApplication: req.body.placementId,
                        },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            return response(
                                res,
                                true,
                                "Withdraw Placement Application Success"
                            );
                        else return response(res, false, "Unable to Apply");
                    }
                );
            else return response(res, false, "Unable to Apply");
        }
    );
};
const ApplyInternship = async (req, res, next) => {
    /**
     * BODY: internshipId
     */
    InternshipModel.updateOne(
        { _id: OId(req.body.internshipId) },
        { $addToSet: { applicants: req.session.user.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                UserAuthModel.updateOne(
                    { _id: OId(req.session.user.userId) },
                    {
                        $addToSet: {
                            internshipApplication: req.body.internshipId,
                        },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            return response(
                                res,
                                true,
                                "Applied to Internship Successfully"
                            );
                        else return response(res, false, "Unable to Apply");
                    }
                );
            else return response(res, false, "Unable to Apply");
        }
    );
};
const WithdrawInternship = async (req, res, next) => {
    /**
     * BODY: internshipId
     */
    InternshipModel.updateOne(
        { _id: OId(req.body.internshipId) },
        { $pull: { applicants: req.session.user.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                UserAuthModel.updateOne(
                    { _id: OId(req.session.user.userId) },
                    {
                        $pull: {
                            internshipApplication: req.body.internshipId,
                        },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            return response(
                                res,
                                true,
                                "Withdraw Internship Application Success"
                            );
                        else return response(res, false, "Unable to Apply");
                    }
                );
            else return response(res, false, "Unable to Apply");
        }
    );
};

module.exports = {
    UpdatePassword,
    Profile,
    UpdateProfile,
    DeleteUser,
    ApplyJob,
    WithdrawJob,
    ApplyPlacement,
    WithdrawPlacement,
    ApplyInternship,
    WithdrawInternship,
};
