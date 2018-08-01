import React, { Component } from 'react';
import './MatchHistory.css';
import api from '../api';
import FavoriteButton from '../components/FavoriteButton';

class MatchHistory extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected_type: 'favorites',
      selected_company_type: 'vendors',
      vendorFavorites: [],
      partnerFavorites: [],
      vendorSearches: [],
      partnerSearches: [],
      message: null,
    };

    this.getVendorFavorites = this.getVendorFavorites.bind(this);
    this.getPartnerFavorites = this.getPartnerFavorites.bind(this);
    this.getVendorSearches = this.getVendorSearches.bind(this);
    this.getPartnerSearches = this.getPartnerSearches.bind(this);
    this.handleSwitchSelected = this.handleSwitchSelected.bind(this);
    this.fomatDate = this.formatDate.bind(this);
  }
  componentDidMount() {
    this.getVendorFavorites();
    this.getPartnerFavorites();
    this.getVendorSearches();
    this.getPartnerSearches();
  }

  getVendorFavorites() {
    api.get_favorite_vendors((error, response) => {
      if(error) {
        this.setState({message: 'Could not get vendor favorites'})
      } else {
        this.setState({vendorFavorites: response});
      }
    });
  }

  getPartnerFavorites() {
    api.get_favorite_partners((error, response) => {
      if(error) {
        this.setState({message: 'Could not get partner favorites'});
      } else {
        this.setState({partnerFavorites: response});
      }
    })
  }

  getVendorSearches() {
    api.get_vendor_search((error, response) => {
      if(error) {
        this.setState({message: 'Could not get partner favorites'});
      } else {
        this.setState({vendorSearches: response});
      }
    })
  }

  getPartnerSearches() {
    api.get_partner_search((error, response) => {
      if(error) {
        this.setState({message: 'Could not get partner favorites'});
      } else {
        this.setState({partnerSearches: response});
      }
    })
  }

  handleSwitchSelected(selected_type, company_type) {
    this.setState({
      selected_type: selected_type,
      selected_company_type: company_type,
    })
  } 

  formatDate(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
  }

  render() {
    if(this.state.selected_type == "favorites") {
      if(this.state.selected_company_type =="vendors") {
        var toLoop = this.state.vendorFavorites;
      } else {
        var toLoop = this.state.partnerFavorites;
      }
      var companies = toLoop.map((favorite) => {
        return(
          <tr> 
            <td>{favorite.companyName}</td>
            <td>{this.formatDate(favorite.created_at)}</td>
            <td>
              <div>Active</div>
              <div>Pursuing</div>
              <div>Remove</div>
            </td>
          </tr>)
      })

      var info = 
      <table className="favTable">
        <tbody>
          <tr className="favTableHeader">
            <th>Company</th>
            <th>Date Added</th>
            <th>Status (Please Select)</th>
          </tr>
          {companies}
        </tbody>
      </table>

    } else {
      if(this.state.selected_company_type =="vendors") {
        var toLoop = this.state.vendorSearches;
      } else {
        var toLoop = this.state.partnerSearches;
      }
      var searches = toLoop.map((search) => {
        return(
          <tr> 
            <td>{search.capability + " - " + search.stack}</td>
            <td>{this.formatDate(search.created_at)}</td>
          </tr>)
      })
      var info = 
      <table className="searchTable">
        <tbody>
          <tr className="searchTableHeader">
            <th>Search</th>
            <th>Date</th>
          </tr>
          {searches}
        </tbody>
      </table>
    }

    return (
      <div className="container">
        <div className="header"> 
          <h1>Match History</h1>
        </div>
        <div className="subHeader">
          <button onClick={this.handleSwitchSelected.bind(this, "favorites", "vendors")}>Vendor Favorites</button>
          <button onClick={this.handleSwitchSelected.bind(this, "favorites", "partners")}>Partner Favorites</button>
          <button onClick={this.handleSwitchSelected.bind(this, "searches", "vendors")}>Vendor Search</button>
          <button onClick={this.handleSwitchSelected.bind(this, "searches", "partners")}>Partner Search</button>
        </div>
        <div className="infoDiv">
          {info}
        </div>
      </div>
    )
  }
}

export default MatchHistory;