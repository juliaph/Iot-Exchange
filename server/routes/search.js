"use strict";
const passport = require("passport");
const db = require("../db");

exports.post = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.search(request.user.id, request.params.type, request.body['stacks[]'], (err, users) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(users.map((user) => {
                    var view = {
                        id: user.id,
                        email: user.email,
                        stacks: user.stacks,
                        companyName: user.companyName
                    };
                    // var data = JSON.parse(user.data);
                    // for (var prop in data)
                    //     view[prop] = data[prop];
                    return view;
                }));
        });
    }
];

exports.getVendors = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getVendorSearch(
            request.user.id, 
        (err, res) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(res);
        });
    }
]

exports.getPartners = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getPartnerSearch(
            request.user.id, 
        (err, res) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(res);
        });
    }
]