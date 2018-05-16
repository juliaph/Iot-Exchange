"use strict";

const db = require("../db");
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    db.getUserById(id, (err, user) => {
        if (err)
            done(err);
        else
            done(null, {
                id: user.id,
                name: user.name
            });
    });
});
function verifyClient(clientId, clientSecret, done) {
    done(null, { id: 'self' });
}
passport.use(new BearerStrategy((accessToken, done) => {
    db.getUserByToken(accessToken, (err, user) => {
        if (err)
            done(err);
        else
            done(null, {
                id: user.id,
                name: user.name
            }, { scope: '*' });
    });
}));