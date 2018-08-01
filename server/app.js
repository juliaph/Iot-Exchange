"use strict";
require('./config/config');

const debug = require("debug");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./routes");

var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./auth');

app.post('/token', routes.oauth2.token);
app.post('/api/user-info', routes.user.info);

app.get('/api/account/profile-info', routes.account.profileInfo);
app.post('/api/account/register', routes.account.register);
app.post('/api/account/logout', routes.account.logout);

app.get('/api/stacks', routes.stacks.get);
app.post('/api/stacks', routes.stacks.post);

app.post('/api/offering', routes.offering.post);
app.delete('/api/offering/:id', routes.offering.delete);

app.post('/api/search/:type', routes.search.post);
app.get('/api/search/vendors', routes.search.getVendors);
app.get('/api/search/partners', routes.search.getPartners);


app.get('/api/capability', routes.capability.get);

app.get('/api/profile/:id', routes.profile.get);

app.get('/api/favorites', routes.favorites.get);
app.get('/api/favorites/isFavorite/:company_id', routes.favorites.getIsFavorite);
app.post('/api/favorites/:company_id', routes.favorites.post);
app.delete('/api/favorites/:id', routes.favorites.delete);

app.put('/api/favorites/:company_id', routes.favorites.put);//TODO
app.get('/api/favorites/partners', routes.favorites.getPartners);
app.get('/api/favorites/vendors', routes.favorites.getVendors);

app.set('port', CONFIG.port || 1337);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});