"use strict";

const passport = require("passport");
const db = require("../db");

exports.get = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getUserStacks(request.user.id, (err, stacks) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(stacks);
        });
    }
];

exports.post = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.updateUserStacks(request.user.id, request.body['stacks[]'], (err, stacks) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(stacks);
        });
    }
];