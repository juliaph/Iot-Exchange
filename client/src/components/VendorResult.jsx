import React, { Component } from 'react';
import './Result.css';

class VendorResult extends Component {
    render() {
        return (
            <div className="result">
                <h3 className="result-title">{this.props.companyName}</h3>
                <div className="result-content">
                    <div className="result-description">
                        <h4>Description</h4>
                    </div>
                    <div className="result-info">
                        <dl>
                            <dt>Contact</dt>
                            <dd>{this.props.firstName} {this.props.lastName}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorResult;
