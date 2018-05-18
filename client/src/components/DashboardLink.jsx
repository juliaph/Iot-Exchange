import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './DashboardLink.css';

class DashboardLink extends Component {
    render() {
        return (
            <button className="dashboard-item" to={this.props.to}>
                
                <div className="dashboard-item-icon">
                    <img src={this.props.icon}/>
                </div>

                <div className="dashboard-item-text">
                    <div className="dashboard-item-label">
                        {this.props.text}
                    </div>
                    
                    <div className="dashboard-item-description">
                        {this.props.description}
                    </div>

                </div>
            </button>
        );
    }
}

export default DashboardLink;