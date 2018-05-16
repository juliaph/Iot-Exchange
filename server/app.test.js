"use strict";

const db = require('./db');

db.grantUser('a', 'b', (err, res) => {
    console.log(err);
});

db.getUserByToken('a', (err) => {
    console.log(err);
});

db.register({ email: 'asdf@test.com', password: 'asdf' }, (err) => {
    console.log(err);
});

db.register({ email: 'test@example.com', password: 'asdf', confirmPassword: 'asde'}, (err) => {
    console.log(err);
});

db.addOffering({
    user_id: 1,
    stack_id: 1
}, (err) => {
    console.log(err);
});