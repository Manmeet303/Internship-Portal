const response = require("../utils/response");

const userRoute = (request, reply) => {
    if (request.req.session.user.type !== "S")
        response(reply.res, false, "This API is for Students");
};
const companyRoute = (request, reply) => {
    if (request.req.session.user.type !== "C")
        response(reply.res, false, "This API is for Students");
};
const adminRoute = (request, reply) => {
    if (request.req.session.user.type !== "A")
        response(reply.res, false, "This API is for Students");
};
const instituteRoute = (request, reply) => {
    if (request.req.session.user.type !== "I")
        response(reply.res, false, "This API is for Students");
};
module.exports = {
    userRoute,
    companyRoute,
    adminRoute,
    instituteRoute,
};
