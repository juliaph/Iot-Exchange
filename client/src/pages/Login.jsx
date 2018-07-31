import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { isFunction } from 'util';
import api from '../api';
import MessageBox from '../components/MessageBox';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        api.login({
            email: this.state.email,
            password: this.state.password
        }, (error, response) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'There was an error logging in',
                        message: error
                    }});
            } else {
                if (isFunction(this.props.onLoggedIn))
                    this.props.onLoggedIn();
            }
        });
        event.preventDefault();
    }

    render() {
        return (
            <div id="login" className="content">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <h3>Log In</h3>
                        <hr />
                    </div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleInputChange}
                        value={this.state.password}
                        required
                    />

                    <div className="buttons">
                        <button type="submit">Log In</button>
                    </div>

                    <div className="links">
                        <Link to="/forgot">Forgot Password? Recover Now</Link>
                        <Link to="/signup">Don't Have An Account? Sign Up</Link>
                    </div>
                </form>
                <MessageBox {...this.state.message} onClose={() => {
                    this.setState({ message: null });
                }} />
            </div>
        );
    }
}

export default Login;