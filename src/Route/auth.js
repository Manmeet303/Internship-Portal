"use strict";
const {
    AdminLogin,
    AdminRegister,
    UserLogin,
    UserRegister,
    CompanyLogin,
    CompanyRegister,
    InstituteLogin,
    InstituteRegister,
    Logout,
} = require("../controllers/Auth");
module.exports = function (fastify, opts, done) {
    fastify.post("/Admin/Login", AdminLogin);
    fastify.post("/Admin/Register", AdminRegister);
    fastify.post("/User/Login", UserLogin);
    fastify.post("/User/Register", UserRegister);
    fastify.post("/Company/Login", CompanyLogin);
    fastify.post("/Company/Register", CompanyRegister);
    fastify.post("/Institute/Login", InstituteLogin);
    fastify.post("/Institute/Register", InstituteRegister);
    fastify.get("/Logout", Logout);
    done();
};
