"use strict";

const passport = require("passport");
const db = require("../db");

exports.register = [
    (request, response) => {
        db.register(request.body, (err) => {
            if (err)
                response.status(400).json(err);
            else
                response.json({ success: true });
        });
    }
];

exports.profileInfo = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getUserById(request.user.id, (err, user) => {
            if (err)
                response.status(400).json(err);
            else {
                var view = {
                    email: user.name
                };
                var profile = JSON.parse(user.data);
                for (var prop in profile) {
                    view[prop] = profile[prop];
                }
                response.json(view);
            }
        });
    }
];

exports.logout = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.clearToken(request.headers['authorization'].replace('Bearer ', ''), (err) => {
            if (err)
                response.json(err);
            else
                response.json({ user_id: request.user.id, name: request.user.name, scope: request.authInfo.scope });
        });
    }
];