"use strict";
const bcrypt = require("bcrypt");
const AdminAuthModel = require("../models/AdminAuth");
const UserAuthModel = require("../models/UserAuth");
const CompanyAuthModel = require("../models/CompanyAuth");
const InstituteAuthModel = require("../models/InstituteAuth");
const response = require("../utils/response");
const userProfile = require("../utils/userProfile");
const companyProfile = require("../utils/companyProfile");

const AdminLogin = async (req, res) => {
    /**
     * BODY: email, password.
     */
    AdminAuthModel.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null)
                return response(res, false, "No Such User Found");
            bcrypt
                .compare(req.body.password, result.password)
                .then((result1) => {
                    if (result1 === true) {
                        req.session.user.isAuthenticated = true;
                        req.session.user.companyId = undefined;
                        req.session.user.userId = result._id.toString();
                        req.session.user.email = result.email;
                        req.session.user.type = "A";
                        return response(res, true, "Login Successful", {
                            type: "A",
                            fname: result.fname,
                            lname: result.lname,
                            email: result.email,
                            mobile: result.mobile,
                            personal: {
                                dob: result.dob,
                                gender: result.gender,
                                address: result.address,
                                city: result.city,
                                state: result.state,
                                country: result.country,
                            },
                        });
                    } else return response(res, false, "Incorrect Password");
                })
                .catch((err) => {
                    return response(res, false, "Bcrypt Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "DB Error", err);
        });
};
const AdminRegister = async (req, res) => {
    /**
     * BODY: fname, lname, email, password, mobile, dob, gender, address, city, state, country
     */
    if (await AdminAuthModel.exists({ email: req.body.email }))
        return response(res, false, "Email Already Exists");
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const query = new AdminAuthModel({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
                personal: {
                    dob: req.body.dob,
                    gender: req.body.gender,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                },
            });
            query
                .save()
                .then((result) => {
                    req.session.user.isAuthenticated = true;
                    req.session.user.companyId = undefined;
                    req.session.user.userId = result._id.toString();
                    req.session.user.email = result.email;
                    req.session.user.type = "A";
                    return response(res, true, "Account Created Successfully", {
                        type: "A",
                        fname: result.fname,
                        lname: result.lname,
                        email: result.email,
                        mobile: result.mobile,
                        personal: {
                            dob: result.dob,
                            gender: result.gender,
                            address: result.address,
                            city: result.city,
                            state: result.state,
                            country: result.country,
                        },
                    });
                })
                .catch((err) => {
                    return response(res, false, "DB Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "Bcrypt Error", err);
        });
};
const UserLogin = async (req, res) => {
    /**
     * BODY: email, password.
     */
    UserAuthModel.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null)
                return response(res, false, "No Such User Found");
            bcrypt
                .compare(req.body.password, result.password)
                .then((result1) => {
                    if (result1 === true) {
                        req.session.user.isAuthenticated = true;
                        req.session.user.companyId = undefined;
                        req.session.user.userId = result._id.toString();
                        req.session.user.email = result.email;
                        req.session.user.type = "S";
                        return response(res, true, "Login Successful", {
                            type: "S",
                            user: userProfile(result),
                        });
                    } else return response(res, false, "Incorrect Password");
                })
                .catch((err) => {
                    return response(res, false, "Bcrypt Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "DB Error", err);
        });
};
const UserRegister = async (req, res) => {
    /**
     * BODY: fname, lname, email, password, mobile, dob, gender, address, city, state, country
     */
    if (await UserAuthModel.exists({ email: req.body.email }))
        return response(res, false, "Email Already Exists");
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const query = new UserAuthModel({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
                personal: {
                    dob: req.body.dob,
                    gender: req.body.gender,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                },
            });
            query
                .save()
                .then((result) => {
                    req.session.user.isAuthenticated = true;
                    req.session.user.companyId = undefined;
                    req.session.user.userId = result._id.toString();
                    req.session.user.email = result.email;
                    req.session.user.type = "S";
                    return response(res, true, "Account Created Successfully", {
                        type: "S",
                        user: userProfile(result),
                    });
                })
                .catch((err) => {
                    return response(res, false, "DB Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "Bcrypt Error", err);
        });
};
const CompanyLogin = async (req, res) => {
    /**
     * BODY: email, password.
     */
    CompanyAuthModel.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null)
                return response(res, false, "No Such User Found");
            bcrypt
                .compare(req.body.password, result.password)
                .then((result1) => {
                    if (result1 === true) {
                        req.session.user.isAuthenticated = true;
                        req.session.user.companyId = result._id.toString();
                        req.session.user.userId = undefined;
                        req.session.user.email = result.email;
                        req.session.user.type = "C";
                        return response(res, true, "Login Successful", {
                            type: "C",
                            user: companyProfile(result),
                        });
                    } else return response(res, false, "Incorrect Password");
                })
                .catch((err) => {
                    return response(res, false, "Bcrypt Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "DB Error", err);
        });
};
const CompanyRegister = async (req, res) => {
    /**
     * BODY: email, password, name, address, city, state, country, type, about, projects, achievements
     */
    if (await CompanyAuthModel.exists({ email: req.body.email }))
        return response(res, false, "Email Already Exists");
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const query = new CompanyAuthModel({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                type: req.body.type,
                about: req.body.about,
                projects: req.body.projects,
                achievements: req.body.achievements,
            });
            query
                .save()
                .then((result) => {
                    req.session.user.isAuthenticated = true;
                    req.session.user.companyId = result._id.toString();
                    req.session.user.userId = undefined;
                    req.session.user.email = result.email;
                    req.session.user.type = "C";
                    return response(res, true, "Account Created Successfully", {
                        type: "C",
                        user: companyProfile(result),
                    });
                })
                .catch((err) => {
                    return response(res, false, "DB Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "Bcrypt Error", err);
        });
};
const InstituteLogin = async (req, res) => {
    /**
     * BODY: email, password.
     */
    InstituteAuthModel.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null)
                return response(res, false, "No Such User Found");
            bcrypt
                .compare(req.body.password, result.password)
                .then((result1) => {
                    if (result1 === true) {
                        req.session.user.isAuthenticated = true;
                        req.session.user.instituteId = result._id.toString();
                        req.session.user.userId = undefined;
                        req.session.user.companyId = undefined;
                        req.session.user.email = result.email;
                        req.session.user.type = "I";
                        return response(res, true, "Login Successful", {
                            type: "I",
                            user: result,
                        });
                    } else return response(res, false, "Incorrect Password");
                })
                .catch((err) => {
                    return response(res, false, "Bcrypt Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "DB Error", err);
        });
};
const InstituteRegister = async (req, res) => {
    /**
     * BODY: email, password, name, address, city, state, country, mobile, about, courseOffered, achievements
     */
    if (await InstituteAuthModel.exists({ email: req.body.email }))
        return response(res, false, "Email Already Exists");
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const query = new InstituteAuthModel({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                mobile: req.body.mobile,
                about: req.body.about,
                courseOffered: req.body.courseOffered,
                achievements: req.body.achievements,
            });
            query
                .save()
                .then((result) => {
                    req.session.user.isAuthenticated = true;
                    req.session.user.instituteId = result._id.toString();
                    req.session.user.userId = undefined;
                    req.session.user.companyId = undefined;
                    req.session.user.email = result.email;
                    req.session.user.type = "I";
                    return response(res, true, "Account Created Successfully", {
                        type: "I",
                        user: companyProfile(result),
                    });
                })
                .catch((err) => {
                    return response(res, false, "DB Error", err);
                });
        })
        .catch((err) => {
            return response(res, false, "Bcrypt Error", err);
        });
};
const Logout = async (req, res) => {
    req.session.user = {
        email: undefined,
        isAuthenticated: false,
        userId: undefined,
        companyId: undefined,
        loginAttempt: 0,
    };
    return response(res, true, "Logged Out Successfully");
};

module.exports = {
    AdminLogin,
    AdminRegister,
    UserLogin,
    UserRegister,
    CompanyLogin,
    CompanyRegister,
    InstituteLogin,
    InstituteRegister,
    Logout,
};
