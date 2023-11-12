"use strict";
const companyProfile = (result) => {
    return {
        _id: result._id.toString(),
        email: result.email,
        name: result.name,
        address: result.address,
        city: result.city,
        state: result.state,
        country: result.country,
        type: result.type,
        about: result.about,
        projects: result.projects,
        achievements: result.achievements,
        images: result.images,
    };
};
module.exports = companyProfile;
