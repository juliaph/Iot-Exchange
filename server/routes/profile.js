"use strict";

const passport = require("passport");
const db = require("../db");

exports.get = [
  passport.authenticate('bearer', { session: false }),
  (request, response) => {
    db.getProfilePage({
      profile_id : request.params.id,
      user_id: request.user.id
    }, (err, profile) => {
      if(err)
        response.status(400).json(err);
      else
        response.json(profile);
    })
  }
];