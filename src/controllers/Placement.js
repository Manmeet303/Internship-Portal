"use strict";
const PlacementModel = require("../models/Placement");
const OId = require("mongoose").Types.ObjectId;
const response = require("../utils/response");

/** For Company */
const Placement = (req, res, next) => {
    /**
     * PARAMS: companyId, placementId, allowWFH, pastExperienceDuration, locations, positionType (*All Optional)
     */
    var query = {};
    if (req.query?.placementId) query["_id"] = OId(req.query?.placementId);
    if (req.query?.companyId) query["companyId"] = OId(req.query?.companyId);
    if (req.query?.allowWFH) query["allowWFH"] = OId(req.query?.allowWFH);
    if (req.query?.pastExperienceDuration)
        query["pastExperienceDuration"] = OId(
            req.query?.pastExperienceDuration
        );
    if (req.query?.positionType)
        query["positionType"] = req.query?.positionType;
    if (req.query?.locations) query["locations"] = req.query?.locations;
    PlacementModel.find(query, (err, result) => {
        if (err) throw err;
        return response(res, true, "Placement Fetch SUccess", result);
    });
};
const AddPlacement = async (req, res, next) => {
    /**
     * BODY: position, pastExperienceDuration, cgpaRequirement, locations, expectedSalary, benefits, skills, responsibility, description, allowWFH.
     */
    const query = new PlacementModel({
        companyId: OId(req.session.user.companyId),
        position: req.body.position,
        pastExperienceDuration: req.body.pastExperienceDuration,
        cgpaRequirement: req.body.cgpaRequirement,
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
        if (err) throw err; //return response(res, false, "Unable to Add Placement", err);
        return response(res, true, "Placement Added Successfully", result);
    });
};
const UpdatePlacement = async (req, res, next) => {
    /**
     * BODY: placementId, updates:{-#-Send all the updated stuff here-#-}
     */
    const query = {
        _id: OId(req.body.placementId),
        companyId: OId(req.session.user.companyId),
    };
    if (await PlacementModel.exists(query))
        PlacementModel.updateOne(query, req.body.updates, (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Placement Updated Successfully");
            else return response(res, false, "Unable to update Placement");
        });
    else return response(res, false, "No such Placement Found");
};
const RemovePlacement = async (req, res, next) => {
    /**
     * BODY: placementId
     */
    const query = {
        _id: OId(req.body.placementId),
        companyId: OId(req.session.user.companyId),
    };
    if (await PlacementModel.exists(query))
        PlacementModel.deleteOne(query, (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1)
                return response(res, true, "Placement Removed Successfully");
            else return response(res, false, "Unable to remove Placement");
        });
    else return response(res, false, "No such Placement Found");
};
module.exports = { Placement, AddPlacement, UpdatePlacement, RemovePlacement };
