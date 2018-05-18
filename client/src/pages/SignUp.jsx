import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './SignUp.css';

import api from '../api';
import MessageBox from '../components/MessageBox';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            type: '',
            profile_firstName: '',
            profile_lastName: '',
            profile_companyName: '',
            message: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        api.register(this.state, (error) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'There was a problem registering the account',
                        message: error
                    }});
            } else {
                window.location.hash = '/login';
            }
        });
        event.preventDefault();
    }

    render() {
        return (
            <div id="signup" className="content">
                <form onSubmit={this.onSubmit}>
                    <div className="title">
                        <h3>Create An Account Now</h3>
                        <hr />
                    </div>
                    <input
                        type="text"
                        name="profile_firstName"
                        placeholder="First Name"
                        onChange={this.onChange}
                        value={this.state.profile_firstName}
                        required
                    />

                    <input
                        type="text"
                        name="profile_lastName"
                        placeholder="Last Name"
                        onChange={this.onChange}
                        value={this.state.profile_lastName}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onChange}
                        value={this.state.email}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={this.onChange}
                        required
                    />

                    <input
                        type="text"
                        name="profile_companyName"
                        placeholder="Company Name"
                        onChange={this.onChange}
                        value={this.state.profile_companyName}
                        required
                    />

                    <select
                        name="type"
                        placeholder="Company Type"
                        onChange={this.onChange}
                        value={this.state.type}
                        required
                    >
                        <option value="" hidden defaultValue>Company Type</option>
                        <option value="vendor">Vendor</option>
                        <option value="partner">Partner</option>
                    </select>

                    <div className="buttons">
                        <button type="submit">Sign Up</button>
                    </div>
                    <Link to="/login">Already have an account? Login</Link>
                </form>
                <MessageBox {...this.state.message} onClose={() => {
                    this.setState({ message: null });
                }} />
            </div>
        );
    }
}

export default SignUp;
