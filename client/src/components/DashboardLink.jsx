import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './DashboardLink.css';

class DashboardLink extends Component {
    render() {
        return (
            <div className={this.props.active ? 'dashboard-item active' : 'dashboard-item'}>
                <div className="dashboard-item-icon">
                </div>
                <div className="dashboard-item-description">
                    <Link to={this.props.to}>
                        <h3>{this.props.text}</h3>
                        <p>{this.props.description}</p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DashboardLink;