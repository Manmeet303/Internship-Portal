"use strict";
const userProfile = (result) => {
    return {
        _id: result._id.toString(),
        fname: result.fname,
        lname: result.lname,
        email: result.email,
        mobile: result.mobile,
        personal: {
            dob: result.personal.dob,
            gender: result.personal.gender,
            address: result.personal.address,
            city: result.personal.city,
            state: result.personal.state,
            country: result.personal.country,
        },
        languages: result.languages,
        skills: result.skills,
        projects: result.projects,
        experience: result.experience,
        education: result.education,
        certifications: result.certifications,
        accomplishments: result.accomplishments,
        jobApplication: result.jobApplication,
        internshipApplication: result.internshipApplication,
        placementApplication: result.placementApplication,
        prevJobApplication: result.prevJobApplication,
        prevInternshipApplication: result.prevInternshipApplication,
        prevPlacementApplication: result.prevPlacementApplication,
        notifications: result.notifications,
    };
};
module.exports = userProfile;
