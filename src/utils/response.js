"use strict";
const response = (res, success = false, msg = "Default Error", data = {}) => {
    return res.send({ success, msg, data });
};

module.exports = response;
