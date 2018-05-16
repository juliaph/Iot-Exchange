"use strict";

const oauth2orize = require("oauth2orize");
const db = require("../db");
const server = oauth2orize.createServer();

server.serializeClient((client, done) => done(null, client.id));
server.deserializeClient((id, done) => {
    return done(null, {});
});

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
    // Validate the client
    db.grantUser(username, password, done);
}));

exports.token = [
    server.token(),
    server.errorHandler()
];