"use strict";

const mysql = require("mysql");
const util = require("util");
const error = require("../error");

const db = {
    createConnection() {
        return mysql.createConnection({
            host: CONFIG.db_host,
            user: CONFIG.db_user,
            password: CONFIG.db_password,
            database: CONFIG.db_name,
            multipleStatements: true
        });
    }
    };

function generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function getProfile(model) {
    var profile = {};
    for (var prop in model) {
        if (prop.indexOf('profile_') == 0) 
            profile[prop] = model[prop];
    }
    return profile;
}

function grantUser(user, password, done) {
    var connection = db.createConnection();
    var u = connection.escape(user);
    var p = connection.escape(password);
    var token = generate_token(256);
    var t = connection.escape(token);
    connection.query('INSERT INTO `accesstokens` (`token`, `user_id`)'
        + ' SELECT ' + t + ', `id`'
        + ' FROM `users`'
        + ' WHERE `name` = ' + u + ' AND `password` = ' + p + ';',
        (err, rows, fields) => {
            if (err)
                done(error.UNSPECIFIED);
            else if (rows.affectedRows < 1)
                done('User was not found or password was incorrect.');
            else
                done(null, token);
        });
    connection.end();
}
exports.grantUser = grantUser;

function clearToken(token, done) {
    var connection = db.createConnection();
    var t = connection.escape(token);
    connection.query('DELETE FROM `accesstokens` WHERE `token` = ' + t + ';',
        (err, rows, fields) => {
            if (err) 
                done('Unspecified error clearing token.');
            else 
                done(null, rows);
        });
    connection.end();
}
exports.clearToken = clearToken;

function getUserByToken(token, done) {
    var connection = db.createConnection();
    var t = connection.escape(token);
    connection.query('SELECT `u`.*'
        + ' FROM `users` AS `u`'
        + ' JOIN `accesstokens` AS `t`'
            + ' ON `u`.`id` = `t`.`user_id`'
        + ' WHERE `t`.`token` = ' + t + ';',
        (err, rows, fields) => {
            if (err)
                done('Unspecified error fetching user by token.', null);
            else if (rows.length > 0)
                done(null, rows[0]);    
            else
                done('User was not found or token expired.', null);
        });
    connection.end();
}
exports.getUserByToken = getUserByToken;

function getUserById(id, done) {
    var connection = db.createConnection();
    var user_id = connection.escape(id);
    connection.query('SELECT * FROM `users`'
        + ' WHERE `id` = ' + user_id + ';',
        (err, rows, fields) => {
            if (err)
                done('Unspecified error fetching user.');
            else if (rows.length > 0)
                done(null, rows[0]);
            else
                done('User was not found.');
        });
    connection.end();
}
exports.getUserById = getUserById;

function register(model, done) {
    var connection = db.createConnection();
    var name = connection.escape(model.email);
    var password = connection.escape(model.password);
    var type = connection.escape(model.type);
    var data = connection.escape(JSON.stringify(getProfile(model)), true);
    if (model.password !== model.confirmPassword) {
        done('Passwords did not match.');
    } else {
        connection.query('INSERT INTO `users` (`name`, `password`, `type`, `data`)'
            + ' VALUES (' + name + ', ' + password + ', ' + type + ', ' + data + ');',
            (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    if (err.code === 'ER_DUP_ENTRY') {
                        done('Username already exists.');
                    } else {
                        done('Unspecified error registering new user.');
                    }
                } else {
                    done(null, rows);
                }
            });
    }
    connection.end();
}
exports.register = register;

function capability(done) {
    var connection = db.createConnection();
    connection.query('SELECT c.id as c_id, c.name as c_name, s.id as s_id, s.name as s_name'
        + ' FROM capabilities AS c'
        + ' JOIN stacks AS s'
        + ' ON c.id = s.capability_id',
        (err, rows, fields) => {
            if (err)
                done('Unspecified error fetching capabilities.');
            else {
                var capabilities = {};
                for (var stack of rows) {
                    if (!capabilities[stack.c_id])
                        capabilities[stack.c_id] = {
                            id: stack.c_id,
                            name: stack.c_name,
                            stacks: []
                        };
                    var capability = capabilities[stack.c_id];
                    capability.stacks.push({
                        id: stack.s_id,
                        name: stack.s_name
                    });
                }
                var result = [];
                for (var id in capabilities) {
                    result.push(capabilities[id]);
                }
                done(null, result);
            }
        });
    connection.end();
}
exports.capability = capability;

function getUserStacks(id, done) {
    var connection = db.createConnection();
    var i = connection.escape(id);
    connection.query('SELECT `s`.`id`, `s`.`name`, `us`.`data`'
        + ' FROM `userstacks` AS `us`'
        + ' JOIN `stacks` AS `s`'
            + ' ON `us`.`stack_id` = `s`.`id`'
        + ' WHERE `us`.`user_id` = ' + i + ';',
        (err, rows, fields) => {
            if (err) {
                done('Unspecified error fetching user data.');
            } else {
                done(null, rows);
            }
        });
    connection.end();
}
exports.getUserStacks = getUserStacks;

function updateUserStacks(id, stacks, done) {
    var connection = db.createConnection();
    var u = connection.escape(id);
    var empty = connection.escape('{}');
    var sarr = [];
    if (util.isArray(stacks)) {
        for (var stack of stacks) {
            sarr.push(parseInt(stack));
        }
    }
    else {
        sarr.push(parseInt(stacks));
    }
    connection.query('DELETE FROM `userstacks` WHERE `user_id` = ' + u + ';'
        + ' INSERT INTO `userstacks` (`user_id`, `stack_id`, `data`)'
        + ' SELECT ' + u + ', `id`, ' + empty 
        + ' FROM `stacks`'
        + ' WHERE `id` IN (' + sarr.join(', ') + ');',
        (err, rows, fields) => {
            if (err) {
                done('Unspecified error updating user data.');
            } else {
                done(null, rows);
            }
        });
    connection.end();
}
exports.updateUserStacks = updateUserStacks;

function addOffering(offering, done) {
    var connection = db.createConnection();
    var user_id = connection.escape(offering.user_id);
    var stack_id = connection.escape(offering.stack_id);
    var d = {};
    for (var prop in offering.data) {
        if (prop.indexOf('offering') == 0) {
            d[prop] = offering.data[prop];
        }
    }
    var data = connection.escape(JSON.stringify(d));
    connection.query('INSERT INTO `userstacks` (`user_id`, `stack_id`, `data`)'
        + ' VALUES (' + user_id + ', ' + stack_id + ', ' + data + ');',
        (err, rows, fields) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    done('User already has an existing offering with that capability.');
                } else
                    done('Unspecified error updating user data.');
            } else {
                done(null, rows);
            }
        });
    connection.end();
}
exports.addOffering = addOffering;

function removeOffering(key, done) {
    var connection = db.createConnection();
    var user_id = connection.escape(key.user_id);
    var stack_id = connection.escape(key.stack_id);
    connection.query('DELETE FROM `userstacks`'
        + ' WHERE `user_id` = ' + user_id + ' AND `stack_id` = ' + stack_id + ';',
        (err, rows, fields) => {
            if (err) {
                done('Unspecified error deleting user data.');
            } else {
                done(null, rows);
            }
        });
    connection.end();
}
exports.removeOffering = removeOffering;

function search(type, stacks, done) {
    var connection = db.createConnection();
    var t = connection.escape(type == 'partners' ? 'partner'
        : type == 'vendors' ? 'vendor' : null);
    var sarr = [];
    if (util.isArray(stacks)) {
        for (var stack of stacks)
            sarr.push(parseInt(stack));
    }
    else if (stacks) {
        sarr.push(parseInt(stacks));
    }
    connection.query('SELECT `u`.*, `s`.`name` AS `stack_name` FROM `users` AS `u`'
        + ' JOIN'
            + ' (SELECT DISTINCT `user_id`'
                + ' FROM `userstacks`'
                + ' WHERE `stack_id` IN (' + sarr.join(', ') + ')) AS `ids`'
            + ' ON `u`.`id` = `ids`.`user_id`'
        + ' JOIN `userstacks` AS `us`' + ' ON `u`.`id` = `us`.`user_id`'
        + ' JOIN `stacks` AS `s` ON `us`.`stack_id` = `s`.`id`'
        + ' WHERE `type` = ' + t, 
        (err, rows, fields) => {
            if (err) {
                console.log(err);
                done('Unspecified error fetching search results.');
            } else {
                var data = {};
                for(var row of rows) {
                    if (!data[row.id]) {
                        var init = {};
                        for(var prop in row) {
                            if (prop != 'stack_name') init[prop] = row[prop];
                        }
                        init.stacks = [];
                        data[row.id] = init;
                    }
                    var user = data[row.id];
                    user.stacks.push(row.stack_name);
                }
                var arr = [];
                for(var item in data) {
                    arr.push(data[item]);
                }
                console.log(arr);
                done(null, arr);
            }
        });
    connection.end();
}
exports.search = search;