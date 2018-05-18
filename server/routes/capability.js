"use strict";

const db = require("../db");

exports.get = [
    (request, response) => {
        db.capability((err, result) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(result);
        });
    }
];