import React, { Component } from 'react';
import api from '../api';

class FavoriteButton extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: false,
        favBtnStyle: {
          backgroundColor: 'white',
          color: 'red',
        }
      }

      api.is_favorite(this.props.company_id, (error, response) => {
        if(!error) {
          if(response.length != 0) {
            this.setState({
              isFavorite: true,
              favBtnStyle: {
                backgroundColor: 'red',
                color: 'white',
              }
            })
          } 
        }
      })
      this.handleFavorite = this.handleFavorite.bind(this);
    }

    handleFavorite(event) {
      if(!this.state.isFavorite) {
        api.post_favorite(this.props.company_id, this.props.type, (error, response) => {
          if(!error) {
              this.setState({ 
                isFavorite: true,
                favBtnStyle: {
                  backgroundColor: 'red',
                  color: 'white',
                }
              });
          }
        });
      } else {
        api.remove_favorite(this.props.company_id, (error, response) => {
          if(!error) {
            this.setState({
                isFavorite: false,
                favBtnStyle: {
                  backgroundColor: 'white',
                  color: 'red',
                }
              });
          }
        });
      }
    }

    render() {
        return (
          <button 
            onClick={this.handleFavorite}
            style={this.state.favBtnStyle}>
            Favorite
          </button>
        );
    }
}

export default FavoriteButton;
