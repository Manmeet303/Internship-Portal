"use strict";
const AdminAuthModel = require("../models/AdminAuth");
const QueryModel = require("../models/Query");
const response = require("../utils/response");
const OId = require("mongoose").Types.ObjectId;

const Profile = async (req, res, next) => {
    AdminAuthModel.findOne({ email: req.session.user.email }, (err, result) => {
        if (err) throw err;
        if (result)
            return response(res, true, "Profile Fetch Success", {
                type: "A",
                user: result,
            });
        else return response(res, false, "Profile Fetch Failure");
    });
};

const GetQuery = (req, res) => {
    if (req.session.user.type !== "A")
        return response(res, false, "You cannot access this API");
    QueryModel.find({ resolved: false }, { resolved: 0 }, (err, data) => {
        if (err) throw err;
        response(res, true, "Queries fetched", data);
    });
};
const GetResolvedQuery = (req, res) => {
    if (req.session.user.type !== "A")
        return response(res, false, "You cannot access this API");
    QueryModel.find({ resolved: true }, { resolved: 0 }, (err, data) => {
        if (err) throw err;
        response(res, true, "Resolved Queries fetched", data);
    });
};
const SubmitQuery = (req, res) => {
    /**
     * Body: name, email, mobile, description
     */
    const query = new QueryModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        description: req.body.description,
    });
    query.save((err, data) => {
        if (err) throw err;
        response(res, true, "Query Submitted", data);
    });
};
const MarkQueryResolved = (req, res) => {
    /**
     * Body: queryId, solution
     */
    if (req.session.user.type !== "A")
        return response(res, false, "You cannot access this API");
    QueryModel.updateOne(
        { _id: OId(req.body.queryId), resolved: false },
        {
            $set: {
                resolved: true,
                resolvedBy: req.session.user.userId,
                solution: req.body.solution,
                resolveDate: Date.now(),
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Query Marked as Resolved");
            else response(res, false, "Unable to resolve the query");
        }
    );
};

module.exports = {
    Profile,
    GetQuery,
    GetResolvedQuery,
    SubmitQuery,
    MarkQueryResolved,
};
