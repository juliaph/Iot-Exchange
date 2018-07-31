import React, { Component } from 'react';
import DashboardLink from "../components/DashboardLink";
import './Dashboard.css';
import findpartnericon from '../images/partner-icon.png';
import findvendoricon from '../images/find-vendor-icon.png';
import matchhistoryicon from '../images/view-history-icon.png';
import manageprofileicon from '../images/manage-profile-icon.png';

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
                <h1 class="dashboard-header">Welcome to your IoT Exchange Dashboard!</h1>

               <center> <div class="row">

                <div class="col-4">
                <img src={findpartnericon} class="image-margin-top" width="125" />
                <hr class="line-spacer" width="50%" />
<h3>Find a Partner</h3>
<p class="body-text-padding">Discover partners that help you achieve your IoT solution</p>
<div class="spacer"></div>
<center><span><a class="dashboard-button" href="#/find-partner">Search for Partners</a></span></center>
</div>

<div class="col-4">
<img src={findvendoricon} class="image-margin-top" width="125" />
<hr class="line-spacer" width="50%" />
<h3>Find a Vendor</h3>
<p class="body-text-padding">Discover vendors that provide products for your IoT solution</p>
<div class="spacer"></div>
<center><span><a class="dashboard-button" href="#/find-vendor">Search for Vendors</a></span></center>
</div>

<div class="col-4">
<img src={matchhistoryicon} class="image-margin-top" width="125" />
<hr class="line-spacer" width="50%" />
<h3>Match History</h3>
<p class="body-text-padding">Browse your previous search history and match results</p>
<div class="spacer"></div>
<center><span><a class="dashboard-button" href="#/match-history">View History</a></span></center>
</div>

<div class="col-4">
<img src={manageprofileicon} class="image-margin-top" width="125"/>
<hr class="line-spacer" width="50%" />
<h3>Manage Profile</h3>
<p class="body-text-padding">Manage your organization’s capabilities</p>
<div class="spacer"></div>
<center><span><a class="dashboard-button" href="#/manage-partner">Go to Profile</a></span></center>
</div>

</div></center>

            </div>
        );
    }
}

export default Dashboard;
