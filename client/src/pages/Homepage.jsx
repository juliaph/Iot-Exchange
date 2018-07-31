import React, { Component } from 'react';
import './Homepage.css';
import partnerprofileicon from "../images/iot-partner-profiles-icon.png";
import vendorprofileicon from "../images/vendor-profile-icon.png";
import searchhistorylandingpageicon from "../images/search-history-landingpage-icon.png";

class Homepage extends Component {
    render() {
        return (
            <div id="content_area" className="content">
                <div id="banner">
                    <div id="banner_content">
                        <h1>IoT Exchange</h1>
                        <hr align="center" width="50%" />
                        <h2>Find partners, share opportunities.</h2>
                       <center> <span>
                        <a class="login-button" href="#/login" class="login-button">Login</a>
                        <a class="signup-button" href="#/signup" class="signup-button">Sign Up</a>
                        </span></center>

                
                    </div>
                </div>
                <center><div id="content_info">
                    <h1>What is IoT Exchange?</h1>
                    <p class="why-iot-text">IoT Exchange is a searchable database for the use of the telephony, IT and OT vendors and their channel partners. Partners may search for IoT products and solutions.  Vendors and partners may search for partners who demonstrate service delivery capability specific to designated IoT products or solutions and who are interested in teaming with others during a customer sales pursuit and/or implementation.</p>

                         <center> <span>
                    <a class="contact-learn-more-button" href="#/contact">Contact to Learn More</a>
                    </span></center>

                </div></center>

<div class="spacer">
</div>
               <center> <div class="row what-iot-offers">
<h1 class="red-text what-iot-offers-header"> What IoT Exchange Offers</h1>
                <div class="col-3">
               <img src={partnerprofileicon} />
                <h3>IoT Partner Profiles</h3>
                <p>Conduct a search of partners, by geography, with telephony, OT and IT skills who are available to team with you on an end-to-end IoT solution.
</p>
                </div>

                  <div class="col-3">
                  <img src={vendorprofileicon} />
                <h3>Vendor IoT Product or Solution Profiles</h3>
                <p>Telephony, IT or OT vendors, can declare their IoT solutions and products.  The results can be searched by others using the search engine.
</p>
                </div>

                  <div class="col-3">
				<img src={searchhistorylandingpageicon} />
                <h3>Search Engine and Search History</h3>
                <p>Revisit previous search types and conduct a search via search history. View favorited partner and vendor profiles to send a message directly.
</p>
                </div>

                </div></center>


           

            </div>
        );
    }
}

export default Homepage;
