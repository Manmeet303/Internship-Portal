"use strict";
const CompanyAuthModel = require("../models/CompanyAuth");
const response = require("../utils/response");
const OId = require("mongoose").Types.ObjectId;
const companyProfile = require("../utils/companyProfile");
const UserAuthModel = require("../models/UserAuth");
const InternshipModel = require("../models/Internship");
const JobModel = require("../models/Job");
const PlacementModel = require("../models/Placement");
const List = async (req, res, next) => {
    CompanyAuthModel.find({}, (err, result) => {
        if (err) throw err;
        if (result)
            return response(res, true, "Company List Fetch Success", result);
        else return response(res, true, "Company List Fetch Failure", []);
    });
};
const getCompany = async (req, res, next) => {
    /**
     * BODY: companyId
     */
    if (await CompanyAuthModel.exists({ _id: OId(req.query.companyId) }))
        CompanyAuthModel.findOne(
            { _id: OId(req.query.companyId) },
            (err, result) => {
                if (err) throw err;
                if (result)
                    return response(res, true, "Company Fetch Success", result);
                else return response(res, true, "Company List Failure");
            }
        );
    else return response(res, true, "No Such Company Found");
};
const UpdatePassword = async (req, res, next) => {
    /**
     * BODY: oldPassword, newPassword
     */

    CompanyAuthModel.findOne(
        { email: req.session.user.email },
        (err, result) => {
            if (err) throw err;
            bcrypt.compare(
                req.body.oldPassword,
                result.password,
                function (err, result1) {
                    if (err) throw err;
                    if (result1)
                        bcrypt.hash(
                            req.body.newPassword,
                            10,
                            function (err, hash) {
                                if (err) throw err;
                                CompanyAuthModel.updateOne(
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
                            }
                        );
                    else return response(res, false, "Incorrect Old Password");
                }
            );
        }
    );
};
const Profile = async (req, res, next) => {
    CompanyAuthModel.findOne(
        { email: req.session.user.email },
        { password: 0 },
        (err, result) => {
            if (err) throw err;
            if (result)
                return response(res, true, "Profile Fetch Success", {
                    type: "C",
                    user: companyProfile(result),
                });
            else return response(res, false, "Profile Fetch Failure");
        }
    );
};
const UpdateProfile = async (req, res, next) => {
    /**
     * BODY: Things that are need to be updated.
     */
    CompanyAuthModel.updateOne(
        { email: req.session.user.email },
        req.body,
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Profile Update Success");
            else return response(res, false, "Profile Update Failure");
        }
    );
};
const DeleteCompany = async (req, res, next) => {
    CompanyAuthModel.findOne(
        { email: req.session.user.email },
        (err, result) => {
            if (err) throw err;
            bcrypt.compare(
                req.body.password,
                result.password,
                function (err, result1) {
                    if (err) throw err;
                    if (result1)
                        CompanyAuthModel.deleteOne(
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
        }
    );
};
const ApproveInternshipApplicant = async (req, res, next) => {
    /**
     * BODY: applicantId, InternshipId
     */
    InternshipModel.updateOne(
        {
            _id: OId(req.body.internshipId),
            companyId: OId(req.session.user.companyId),
        },
        {
            $addToSet: { approvedApplicants: req.body.applicantId },
            $pull: { applicants: req.body.applicantId },
        }
    ).then(
        (result) => {
            if (result.modifiedCount === 1) {
                UserAuthModel.updateOne(
                    {
                        _id: OId(req.body.applicantId),
                    },
                    {
                        $push: {
                            notifications: {
                                type: "success",
                                msg: "You have been approved to the internship.",
                                datetime: Date.now(),
                                internshipId: req.body.internshipId,
                            },
                            prevInternshipApplication: {
                                internshipId: req.body.internshipId,
                                date: Date.now(),
                                status: "approved",
                            },
                        },
                        $pull: { internshipApplication: req.body.internshipId },
                    }
                ).then(
                    (result1) => {
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Applicant Approved");
                        else
                            return response(
                                res,
                                false,
                                "Unable to Approve Applicant"
                            );
                    },
                    (err) => {
                        return response(
                            res,
                            false,
                            "Unable to process your Info",
                            err
                        );
                    }
                );
            } else
                return response(res, false, "Unable to Accept the Applicant");
        },
        (err) => {
            return response(res, false, "Unable to Accept the Applicant", err);
        }
    );
};
const RejectInternshipApplicant = async (req, res, next) => {
    /**
     * BODY: applicantId, InternshipId
     */
    InternshipModel.updateOne(
        {
            _id: OId(req.body.internshipId),
            companyId: OId(req.session.user.companyId),
        },
        {
            $pull: { applicants: req.body.applicantId },
        }
    ).then(
        (result) => {
            if (result.modifiedCount === 1) {
                UserAuthModel.updateOne(
                    {
                        _id: OId(req.body.applicantId),
                    },
                    {
                        $push: {
                            notifications: {
                                type: "failure",
                                msg: "You have been rejected from this internship.",
                                datetime: Date.now(),
                                internshipId: req.body.internshipId,
                            },
                            prevInternshipApplication: {
                                internshipId: req.body.internshipId,
                                status: "rejected",
                            },
                        },
                        $pull: { internshipApplication: req.body.internshipId },
                    }
                ).then(
                    (result1) => {
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Applicant Rejected");
                        else
                            return response(
                                res,
                                false,
                                "Unable to Reject Applicant"
                            );
                    },
                    (err) => {
                        return response(
                            res,
                            false,
                            "Unable to process your Info",
                            err
                        );
                    }
                );
            } else
                return response(
                    res,
                    false,
                    "Unable to Reject the Applicant",
                    err
                );
        },
        (err) => {
            return response(res, false, "Unable to Reject the Applicant", err);
        }
    );
};
const ApproveJobApplicant = async (req, res, next) => {
    /**
     * BODY: applicantId, JobId
     */
    JobModel.updateOne(
        {
            _id: OId(req.body.jobId),
            companyId: OId(req.session.user.companyId),
        },
        {
            $addToSet: { approvedApplicants: req.body.applicantId },
            $pull: { applicants: req.body.applicantId },
        }
    ).then(
        (result) => {
            if (result.modifiedCount === 1) {
                UserAuthModel.updateOne(
                    {
                        _id: OId(req.body.applicantId),
                    },
                    {
                        $push: {
                            notifications: {
                                type: "success",
                                msg: "You have been approved to the job.",
                                datetime: Date.now(),
                                jobId: req.body.jobId,
                            },
                            prevJobApplication: {
                                jobId: req.body.jobId,
                                date: Date.now(),
                                status: "approved",
                            },
                        },
                        $pull: { jobApplication: req.body.jobId },
                    }
                ).then(
                    (result1) => {
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Applicant Approved");
                        else
                            return response(
                                res,
                                false,
                                "Unable to Approve Applicant"
                            );
                    },
                    (err) => {
                        return response(
                            res,
                            false,
                            "Unable to process your Info",
                            err
                        );
                    }
                );
            } else
                return response(res, false, "Unable to Accept the Applicant");
        },
        (err) => {
            return response(res, false, "Unable to Accept the Applicant", err);
        }
    );
};
const RejectJobApplicant = async (req, res, next) => {
    /**
     * BODY: applicantId, JobId
     */
    JobModel.updateOne(
        {
            _id: OId(req.body.jobId),
            companyId: OId(req.session.user.companyId),
        },
        {
            $pull: { applicants: req.body.applicantId },
        }
    ).then(
        (result) => {
            if (result.modifiedCount === 1) {
                UserAuthModel.updateOne(
                    {
                        _id: OId(req.body.applicantId),
                    },
                    {
                        $push: {
                            notifications: {
                                type: "failure",
                                msg: "You have been rejected from this job.",
                                datetime: Date.now(),
                                jobId: req.body.jobId,
                            },
                            prevJobApplication: {
                                jobId: req.body.jobId,
                                status: "rejected",
                            },
                        },
                        $pull: { jobApplication: req.body.jobId },
                    }
                ).then(
                    (result1) => {
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Applicant Rejected");
                        else
                            return response(
                                res,
                                false,
                                "Unable to Reject Applicant"
                            );
                    },
                    (err) => {
                        return response(
                            res,
                            false,
                            "Unable to process your Info",
                            err
                        );
                    }
                );
            } else
                return response(
                    res,
                    false,
                    "Unable to Reject the Applicant",
                    err
                );
        },
        (err) => {
            return response(res, false, "Unable to Reject the Applicant", err);
        }
    );
};
const ApprovePlacementApplicant = async (req, res, next) => {
    /**
     * BODY: applicantId, PlacementId
     */
    PlacementModel.updateOne(
        {
            _id: OId(req.body.placementId),
            companyId: OId(req.session.user.companyId),
        },
        {
            $addToSet: { approvedApplicants: req.body.applicantId },
            $pull: { applicants: req.body.applicantId },
        }
    ).then(
        (result) => {
            if (result.modifiedCount === 1) {
                UserAuthModel.updateOne(
                    {
                        _id: OId(req.body.applicantId),
                    },
                    {
                        $push: {
                            notifications: {
                                type: "success",
                                msg: "You have been approved to the placement.",
                                datetime: Date.now(),
                                placementId: req.body.placementId,
                            },
                            prevPlacementApplication: {
                                placementId: req.body.placementId,
                                date: Date.now(),
                                status: "approved",
                            },
                        },
                        $pull: { placementApplication: req.body.placementId },
                    }
                ).then(
                    (result1) => {
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Applicant Approved");
                        else
                            return response(
                                res,
                                false,
                                "Unable to Approve Applicant"
                            );
                    },
                    (err) => {
                        return response(
                            res,
                            false,
                            "Unable to process your Info",
                            err
                        );
                    }
                );
            } else
                return response(res, false, "Unable to Accept the Applicant");
        },
        (err) => {
            return response(res, false, "Unable to Accept the Applicant", err);
        }
    );
};
const RejectPlacementApplicant = async (req, res, next) => {
    /**
     * BODY: applicantId, PlacementId
     */
    PlacementModel.updateOne(
        {
            _id: OId(req.body.placementId),
            companyId: OId(req.session.user.companyId),
        },
        {
            $pull: { applicants: req.body.applicantId },
        }
    ).then(
        (result) => {
            if (result.modifiedCount === 1) {
                UserAuthModel.updateOne(
                    {
                        _id: OId(req.body.applicantId),
                    },
                    {
                        $push: {
                            notifications: {
                                type: "failure",
                                msg: "You have been rejected from this placement.",
                                datetime: Date.now(),
                                placementId: req.body.placementId,
                            },
                            prevPlacementApplication: {
                                placementId: req.body.placementId,
                                status: "rejected",
                            },
                        },
                        $pull: { placementApplication: req.body.placementId },
                    }
                ).then(
                    (result1) => {
                        if (result1.modifiedCount === 1)
                            return response(res, true, "Applicant Rejected");
                        else
                            return response(
                                res,
                                false,
                                "Unable to Reject Applicant"
                            );
                    },
                    (err) => {
                        return response(
                            res,
                            false,
                            "Unable to process your Info",
                            err
                        );
                    }
                );
            } else
                return response(
                    res,
                    false,
                    "Unable to Reject the Applicant",
                    err
                );
        },
        (err) => {
            return response(res, false, "Unable to Reject the Applicant", err);
        }
    );
};
const showInternshipApplicant = async (req, res, next) => {
    /**
     * BODY: internshipId, approved
     */
    var query = {};
    if (req.body?.approved === 1) query = { approvedApplicants: 1, _id: 0 };
    else query = { applicants: 1, _id: 0 };
    InternshipModel.findOne(
        {
            _id: OId(req.body.internshipId),
            companyId: OId(req.session.user.companyId),
        },
        query
    ).then(
        (result) => {
            query = {};
            if (req.body?.approved === 1)
                query = { _id: { $in: result.approvedApplicants } };
            else query = { _id: { $in: result.applicants } };
            UserAuthModel.find(query, {
                fname: 1,
                lname: 1,
                email: 1,
                "personal.address": 1,
                "personal.city": 1,
                "personal.state": 1,
                "personal.country": 1,
                skills: 1,
            }).then(
                (result1) => {
                    return response(
                        res,
                        true,
                        "Found these applicants",
                        result1
                    );
                },
                (err) => {
                    return response(
                        res,
                        false,
                        "Unable to find applicants",
                        err
                    );
                }
            );
        },
        (err) => {
            return response(res, false, "Unable to find that internship", err);
        }
    );
};
const showJobApplicant = async (req, res, next) => {
    /**
     * BODY: jobId, approved
     */
    var query = {};
    if (req.body?.approved === 1) query = { approvedApplicants: 1, _id: 0 };
    else query = { applicants: 1, _id: 0 };
    JobModel.findOne(
        {
            _id: OId(req.body.jobId),
            companyId: OId(req.session.user.companyId),
        },
        query
    ).then(
        (result) => {
            query = {};
            if (req.body?.approved === 1)
                query = { _id: { $in: result.approvedApplicants } };
            else query = { _id: { $in: result.applicants } };
            UserAuthModel.find(query, {
                fname: 1,
                lname: 1,
                email: 1,
                "personal.address": 1,
                "personal.city": 1,
                "personal.state": 1,
                "personal.country": 1,
                skills: 1,
            }).then(
                (result1) => {
                    return response(
                        res,
                        true,
                        "Found these applicants",
                        result1
                    );
                },
                (err) => {
                    return response(
                        res,
                        false,
                        "Unable to find applicants",
                        err
                    );
                }
            );
        },
        (err) => {
            return response(res, false, "Unable to find that job", err);
        }
    );
};
const showPlacementApplicant = async (req, res, next) => {
    /**
     * BODY: placementId, approved
     */
    var query = {};
    if (req.body?.approved === 1) query = { approvedApplicants: 1, _id: 0 };
    else query = { applicants: 1, _id: 0 };
    PlacementModel.findOne(
        {
            _id: OId(req.body.placementId),
            companyId: OId(req.session.user.companyId),
        },
        query
    ).then(
        (result) => {
            query = {};
            if (req.body?.approved === 1)
                query = { _id: { $in: result.approvedApplicants } };
            else query = { _id: { $in: result.applicants } };
            UserAuthModel.find(query, {
                fname: 1,
                lname: 1,
                email: 1,
                "personal.address": 1,
                "personal.city": 1,
                "personal.state": 1,
                "personal.country": 1,
                skills: 1,
            }).then(
                (result1) => {
                    return response(
                        res,
                        true,
                        "Found these applicants",
                        result1
                    );
                },
                (err) => {
                    return response(
                        res,
                        false,
                        "Unable to find applicants",
                        err
                    );
                }
            );
        },
        (err) => {
            return response(res, false, "Unable to find that placement", err);
        }
    );
};

module.exports = {
    UpdatePassword,
    Profile,
    UpdateProfile,
    DeleteCompany,
    List,
    getCompany,
    showInternshipApplicant,
    ApproveInternshipApplicant,
    RejectInternshipApplicant,
    showJobApplicant,
    ApproveJobApplicant,
    RejectJobApplicant,
    showPlacementApplicant,
    ApprovePlacementApplicant,
    RejectPlacementApplicant,
};
