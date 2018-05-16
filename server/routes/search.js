"use strict";

const db = require("../db");

exports.post = [
    (request, response) => {
        db.search(request.params.type, request.body['stacks[]'], (err, users) => {
            if (err)
                response.status(400).json(err);
            else
                response.json(users.map((user) => {
                    var view = {
                        id: user.id,
                        email: user.name
                    };
                    var data = JSON.parse(user.data);
                    for (var prop in data)
                        view[prop] = data[prop];
                    return view;
                }));
        });
    }
];