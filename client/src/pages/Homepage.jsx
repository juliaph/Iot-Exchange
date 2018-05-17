import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
    render() {
        return (
            <div id="content_area" className="content">
                <div id="banner">
                    <div id="banner_content">
                        <h1>IoT Exchange</h1>
                        <hr align="left" width="100%" />
                        <h2>Find partners, share opportunities.</h2>
                    </div>
                </div>
                <div id="content_info">
                    <h1>What is IoT Exchange?</h1>
                    <p>The IoT-Exchange is the place for IoT professionals to share opportunities, 
                        connect with integrators and solution providers, and exchange ideas.</p>
                </div>

            </div>
        );
    }
}

export default Homepage;
