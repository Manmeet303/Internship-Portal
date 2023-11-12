"use strict";
const InternshipModel = require("../models/Internship");
const OId = require("mongoose").Types.ObjectId;
const response = require("../utils/response");

const Internship = async (req, res, next) => {
    /**
     * PARAMS: companyId, internshipId, allowWFH, duration, locations, positionType (*All Optional)
     */
    var query = {};
    if (req.query?.internshipId) query["_id"] = OId(req.query?.internshipId);
    if (req.query?.companyId) query["companyId"] = OId(req.query?.companyId);
    if (req.query?.allowWFH) query["allowWFH"] = req.query?.allowWFH;
    if (req.query?.positionType)
        query["positionType"] = req.query?.positionType;
    if (req.query?.locations) query["locations"] = req.query?.locations;
    InternshipModel.find(query, (err, result) => {
        if (err) throw err;
        return response(res, true, "Internship Fetch Success", result);
    });
};
const AddInternship = async (req, res, next) => {
    /**
     * BODY: position, openPositions, duration, locations, stipend, benefits, skills, description, allowWFH.
     */
    const query = new InternshipModel({
        companyId: OId(req.session.user.companyId),
        position: req.body.position,
        openPositions: req.body.openPositions,
        duration: req.body.duration,
        locations: req.body.locations,
        stipend: req.body.stipend,
        benefits: req.body.benefits,
        skills: req.body.skills,
        positionType: req.body.positionType,
        description: req.body.description,
        allowWFH: req.body.allowWFH,
    });
    query.save((err, result) => {
        if (err) return response(res, false, "Unable to Add Intenship", err);
        return response(res, true, "Internship Added Successfully", result);
    });
};
const UpdateInternship = async (req, res, next) => {
    /**
     * BODY: internshipId, updates:{-#-Send all the updated stuff here-#-}
     */
    const query = {
        _id: OId(req.body.internshipId),
        companyId: OId(req.session.user.companyId),
    };
    if (await InternshipModel.exists(query))
        InternshipModel.updateOne(query, req.body.updates, (err, result) => {
            if (err)
                return response(res, false, "Unable to update Intenship", err);
            if (result.modifiedCount === 1)
                return response(res, true, "Internship Updated Successfully");
            else return response(res, false, "Unable to update Internship");
        });
    else return response(res, false, "No such Internship Found");
};
const RemoveInternship = async (req, res, next) => {
    /**
     * BODY: internshipId
     */
    const query = {
        _id: OId(req.body.internshipId),
        companyId: OId(req.session.user.companyId),
    };
    if (await InternshipModel.exists(query))
        InternshipModel.deleteOne(query, (err, result) => {
            if (err)
                return response(res, false, "Unable to delete Intenship", err);
            if (result.deletedCount === 1)
                return response(res, true, "Internship Removed Successfully");
            else return response(res, false, "Unable to remove Internship");
        });
    else return response(res, false, "No such Internship Found");
};

module.exports = {
    Internship,
    AddInternship,
    UpdateInternship,
    RemoveInternship,
};
