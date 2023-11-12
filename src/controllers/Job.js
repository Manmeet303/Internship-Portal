"use strict";
const JobModel = require("../models/Job");
const OId = require("mongoose").Types.ObjectId;
const response = require("../utils/response");

const Job = (req, res, next) => {
    /**
     * PARAMS: companyId, jobId, allowWFH, pastExperienceDuration, locations, positionType (*All Optional)
     */
    var query = {};
    if (req.query?.jobId) query["_id"] = OId(req.query?.jobId);
    if (req.query?.companyId) query["companyId"] = OId(req.query?.companyId);
    if (req.query?.allowWFH) query["allowWFH"] = req.query?.allowWFH;
    if (req.query?.pastExperienceDuration)
        query["pastExperienceDuration"] = req.query?.pastExperienceDuration;
    if (req.query?.positionType)
        query["positionType"] = req.query?.positionType;
    if (req.query?.locations) query["locations"] = req.query?.locations;
    JobModel.find(query, (err, result) => {
        if (err) return response(res, false, "Unable to Add Intenship", err);
        return response(res, true, "Job Fetch SUccess", result);
    });
};
const AddJob = async (req, res, next) => {
    /**
     * BODY: position, pastExperienceDuration, locations, expectedSalary, benefits, skills, responsibility, description, allowWFH.
     */
    const query = new JobModel({
        companyId: OId(req.session.user.companyId),
        position: req.body.position,
        pastExperienceDuration: req.body.pastExperienceDuration,
        locations: req.body.locations,
        expectedSalary: req.body.expectedSalary,
        benefits: req.body.benefits,
        skills: req.body.skills,
        responsibility: req.body.responsibility,
        positionType: req.body.positionType,
        description: req.body.description,
        allowWFH: req.body.allowWFH,
    });
    query.save((err, result) => {
        if (err) return response(res, false, "Unable to Add Job", err);
        return response(res, true, "Job Added Successfully", result);
    });
};
const UpdateJob = async (req, res, next) => {
    /**
     * BODY: jobId, updates:{-#-Send all the updated stuff here-#-}
     */
    const query = {
        _id: OId(req.body.jobId),
        companyId: OId(req.session.user.companyId),
    };
    if (await JobModel.exists(query))
        JobModel.updateOne(query, req.body.updates, (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Job Updated Successfully");
            else return response(res, false, "Unable to update Job");
        });
    else return response(res, false, "No such Job Found");
};
const RemoveJob = async (req, res, next) => {
    /**
     * BODY: jobId
     */
    const query = {
        _id: OId(req.body.jobId),
        companyId: OId(req.session.user.companyId),
    };
    if (await JobModel.exists(query))
        JobModel.deleteOne(query, (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1)
                return response(res, true, "Job Removed Successfully");
            else return response(res, false, "Unable to remove Job");
        });
    else return response(res, false, "No such Job Found");
};

module.exports = { Job, AddJob, UpdateJob, RemoveJob };
