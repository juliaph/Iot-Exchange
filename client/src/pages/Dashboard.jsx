import React, { Component } from 'react';
import DashboardLink from "../components/DashboardLink";
import './Dashboard.css';
import matchIcon from '../match.png';
import api from '../api';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            complete: false
        };

        api.stack((error, response) => {
            if (error) {

            } else {
                this.setState({
                    complete: (response && response.length > 0) ? true : false
                });
            }
        });
    }

    render() {
        const manage = this.props.type === 'vendor' ? {
            to: '/manage-vendor',
            text: 'Manage',
            description: 'Manage your vendor profile'
        } : this.props.type === 'partner' ? {
            to: '/manage-partner',
            text: 'Manage',
            description: 'Manage your partner profile'
        } : null;
        return (
            <div id="dashboard" className="content">
                
                <button><DashboardLink to="/find-partner"
                    text="Find a partner"
                    description="Discover partners that can help you achieve your IoT solution."
                /></button>
                <DashboardLink to="/find-vendor"
                    text="Find a Vendor"
                    description="Discover vendors that can provide the right products for your IoT solution."
                />
                <DashboardLink {...manage} />
                <DashboardLink to="/match-history"
                    text="Match History"
                    description="Browse your match history."
                />
            </div>
        );
    }
}

export default Dashboard;
