import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CapabilityStack from '../components/CapabilityStack';

class FindPartner extends Component {
    constructor() {
        super();
        this.state = {
            stack: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        var stack = this.state.stack;
        if (event.target.checked) {
            stack.push(event.target.value);
        } else {
            var index = this.state.stack.indexOf(event.target.value);
            if (index !== -1) {
                stack.splice(index, 1);
            }
        }

        this.setState({ stack: stack });
    }

    render() {
        const searchLink = '/results/partners/' + this.state.stack;
        return (
            <div id="find-partner" className="content">
                <h1>Find a Partner</h1>
                <h3>Please select the capabilities your organization requires assistance with in
                    order to complete an IoT solution.</h3>
                <CapabilityStack stack={this.state.stack} onChange={this.handleInputChange} />
                <div className="buttons">
                    <Link to={searchLink}>Find Partners</Link>
                </div>
            </div>
        );
    }
}

export default FindPartner;
