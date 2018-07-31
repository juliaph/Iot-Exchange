"use strict";

const passport = require("passport");
const db = require("../db");

exports.get = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getFavorites({
            user_id: request.user.id,
        }, (err, res) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(res);
        });
}]

exports.post = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.addFavorite({
            user_id: request.user.id,
            company_id: request.params.company_id,
        }, (err, res) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(res);
        });
    }
];

exports.delete = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.removeFavorite({
            user_id: request.user.id,
            company_id: request.params.id
        }, (err, r) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(r);
        });
    }
];

//TODO
exports.put = [
    passport.authenticate('bearer', {session:false}),
    (request, response) => {
        db.updateFavorite(request.body, {
            user_id : request.user.id,
            company_id: request.params.id,
        }), (err, res) => {
            if(err)
                response.status(400).json(err);
            else
                response.json(res);
        }
    }
]

//TODO
exports.getPartners = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getFavoritePartners({
            user_id: request.user.id,
        }, (err, res) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(res);
        });
}]

//TODO 
exports.getVendors = [
    passport.authenticate('bearer', { session: false }),
    (request, response) => {
        db.getFavoriteVendors({
            user_id: request.user.id,
        }, (err, res) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(res);
        });
}]