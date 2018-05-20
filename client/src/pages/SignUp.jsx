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
            profile_companyName: '',
            type: '',
            phone_number: '',
            street_address: '',
            city: '',
            state: '',
            zipcode: '',
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

                    <input
                        type="phone"
                        name="phone_number"
                        placeholder="Phone Number"
                        onChange={this.onChange}
                        //value={this.state.phone_number}
                        required
                    />

                    <input
                        type="address"
                        name="street_address"
                        placeholder="Street Address"
                        onChange={this.onChange}
                        //value={this.state.street_address}
                        required
                    />

                    <input
                        type="city"
                        name="city"
                        placeholder="City"
                        onChange={this.onChange}
                        //value={this.state.city}
                        required
                    />

                    <input
                        type="state"
                        name="state"
                        placeholder="State"
                        onChange={this.onChange}
                        //value={this.state.state}
                        required
                    />

                    <input
                        type="zipcode"
                        name="zipcode"
                        placeholder="Zip Code"
                        onChange={this.onChange}
                        //value={this.state.zipcode}
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
