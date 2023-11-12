"use strict";
const EventModel = require("../models/Event");
const OId = require("mongoose").Types.ObjectId;
const response = require("../utils/response");

const Event = async (req, res, next) => {
    /**
     * PARAMS: companyId, eventId, isPaid(*All Optional)
     */
    var query = {};
    if (req.query?.eventId) query["_id"] = OId(req.query?.eventId);
    if (req.query?.companyId) query["companyId"] = OId(req.query?.companyId);
    if (req.query?.isPaid) query["isPaid"] = req.query?.isPaid;
    EventModel.find(query, (err, result) => {
        if (err) throw err;
        return response(res, true, "Event Fetch Success", result);
    });
};
const AddEvent = async (req, res, next) => {
    /**
     * BODY: title, address, date, isPaid, payAmount, description, targetAudience
     */
    const query = new EventModel({
        companyId: OId(req.session.user.companyId),
        title: req.body.title,
        address: req.body.address,
        date: req.body.date,
        isPaid: req.body.isPaid,
        payAmount: req.body.payAmount,
        description: req.body.description,
        targetAudience: req.body.targetAudience,
    });
    query.save((err, result) => {
        if (err) return response(res, false, "Unable to Add Event", err);
        return response(res, true, "Event Added Successfully", result);
    });
};
const UpdateEvent = async (req, res, next) => {
    /**
     * BODY: eventId, updates:{-#-Send all the updated stuff here-#-}
     */
    const query = {
        _id: OId(req.body.eventId),
        companyId: OId(req.session.user.companyId),
    };
    if (await EventModel.exists(query))
        EventModel.updateOne(query, req.body.updates, (err, result) => {
            if (err) return response(res, false, "Unable to update Event", err);
            if (result.modifiedCount === 1)
                return response(res, true, "Event Updated Successfully");
            else return response(res, false, "Unable to update Event");
        });
    else return response(res, false, "No such Event Found");
};
const RemoveEvent = async (req, res, next) => {
    /**
     * BODY: eventId
     */
    const query = {
        _id: OId(req.body.eventId),
        companyId: OId(req.session.user.companyId),
    };
    if (await EventModel.exists(query))
        EventModel.deleteOne(query, (err, result) => {
            if (err)
                return response(res, false, "Unable to delete Intenship", err);
            if (result.deletedCount === 1)
                return response(res, true, "Event Removed Successfully");
            else return response(res, false, "Unable to remove Event");
        });
    else return response(res, false, "No such Event Found");
};

module.exports = {
    Event,
    AddEvent,
    UpdateEvent,
    RemoveEvent,
};
