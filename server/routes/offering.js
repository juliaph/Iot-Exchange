"use strict";

const passport = require("passport");
const db = require("../db");

exports.post = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        var offering = request.body;
        db.addOffering({
            user_id: request.user.id,
            stack_id: offering.id,
            data: offering
        }, (err, r) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(r);
        });
    }
];

exports.delete = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        var offering = request.body;
        db.removeOffering({
            user_id: request.user.id,
            stack_id: request.params.id
        }, (err, r) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(r);
        });
    }
];