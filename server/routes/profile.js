"use strict";

const passport = require("passport");
const db = require("../db");

exports.get = [
  passport.authenticate('bearer', { session: false }),
  (request, response) => {
    db.getProfilePage(request.params.id, (err, profile) => {
      if(err)
        response.status(400).json(err);
      else
        response.json(profile);
    })
  }
];