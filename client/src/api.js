import $ from 'jquery';

export default {
    // endpoint: '', // production
    endpoint: 'http://localhost:1337', // development
    tokenKey: 'bearer:token',
    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    },
    logout(done) {
        $.ajax({
            url: this.endpoint + '/api/account/logout',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            async: false
        }).always(() => {
            sessionStorage.removeItem(this.tokenKey);
            done();
        });
    },
    login(credentials, done) {
        $.ajax({
            url: this.endpoint + '/token',
            method: 'POST',
            data: {
                grant_type: 'password',
                username: credentials.email,
                password: credentials.password
            }
        }).done((response) => {
            sessionStorage.setItem(this.tokenKey, response.access_token);
            done(null, response);
        }).fail((xhr) => {
            sessionStorage.removeItem(this.tokenKey);
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('User not found or password was incorrect.');
            }
        });
    },
    isAuthenticated() {
        return this.getToken() ? true : false;
    },
    register(model, done) {
        $.ajax({
            url: this.endpoint + '/api/account/register',
            method: 'POST',
            data: model
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to register.');
            }
        });
    },
    profile(done) {
        $.ajax({
            url: this.endpoint + '/api/account/profile-info',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            dataType: 'json'
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to load profile.');
            }
        });
    },
    stack(done) {
        $.ajax({
            url: this.endpoint + '/api/stacks',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            dataType: 'json'
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to load stacks.');
            }
        });
    },
    updateStack(stack, done) {
        $.ajax({
            url: this.endpoint + '/api/stacks',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: {
                stacks: stack
            },
            dataType: 'json'
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to update stacks.');
            }
        });
    },
    search(type, stack, done) {
        $.ajax({
            url: this.endpoint + '/api/search/' + type,
            method: 'POST',
            data: {
                stacks: stack || []
            }
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to load search results.');
            }
        });
    },
    updateOffering(model, done) {
        var offering = {
            id: model.id
        };
        for (var prop in model) {
            if (prop.startsWith('offering')) {
                offering[prop] = model[prop];
            }
        }
        $.ajax({
            url: this.endpoint + '/api/offering',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: offering
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON)
                done(xhr.responseJSON);
            else
                done('Unable to add offering.');
        });
    },
    removeOffering(id, done) {
        $.ajax({
            url: this.endpoint + '/api/offering/' + id,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to remove offering.');
            }
        });
    },
    capability(done) {
        $.ajax({
            url: this.endpoint + '/api/capability/',
            method: 'GET'
        }).done((response) => {
            done(null, response);
        }).fail((xhr) => {
            if (xhr.responseJSON) {
                done(xhr.responseJSON);
            } else {
                done('Unable to get capabilities.');
            }
        });
    }
};