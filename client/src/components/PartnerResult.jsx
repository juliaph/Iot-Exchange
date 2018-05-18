import React, { Component } from 'react';
import './Result.css';

class PartnerResult extends Component {
    render() {
        const stacks = this.props.stacks.map((stack) => {
            return (<span key={stack} className="result-stack">
                {stack}
            </span>);
        });
        return (
            <div className="result">
                <h3 className="result-title">{this.props.profile_companyName}</h3>
                <div className="result-content">
                    <div className="result-description">
                        <h4>Description</h4>
                        <p>loremn</p>
                        <h4>Stacks</h4>
                        {stacks}
                    </div>
                    <div className="result-info">
                        <dl>
                            <dt>Contact</dt>
                            <dd>{this.props.profile_firstName} {this.props.profile_lastName}</dd>
                            <dt>Email</dt>
                            <dd>{this.props.email}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

export default PartnerResult;
