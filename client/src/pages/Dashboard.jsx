import React, { Component } from 'react';
import DashboardLink from "../components/DashboardLink";
import './Dashboard.css';
import matchIcon from '../icons/match.png';
import searchIcon from '../icons/search.png';
import updateIcon from '../icons/update.png';
import historyIcon from '../icons/history.png';

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
            text: 'Manage Profile',
            description: "Manage your organization's products or services."
        } : this.props.type === 'partner' ? {
            to: '/manage-partner',
            text: 'Manage Profile',
            description: "Manage your organization's capabilities."
        } : null;
        return (
            <div id="dashboard" className="content">
                <h1>Welcome to your IoT Exchange Dashboard!</h1>

                <DashboardLink icon={matchIcon}
                    to="/find-partner"
                    text="Find a Partner"
                    description="Discover partners that can help you achieve your IoT solution."
                />
                <DashboardLink icon={searchIcon}
                    to="/find-vendor"
                    text="Find a Vendor"
                    description="Discover vendors that can provide the right products for your IoT solution."
                />
                <DashboardLink icon={updateIcon}
                    {...manage} />
                <DashboardLink icon={historyIcon}
                    to="/match-history"
                    text="Match History"
                    description="Browse your previous match results."
                />
            </div>
        );
    }
}

export default Dashboard;
