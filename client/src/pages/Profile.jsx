import React, { Component } from 'react';
import api from '../api';

class Profile extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      profile: {
        stacks: [],
      },
      message: null
  };

    api.profile_page(this.props.match.params.id, (error, response) => {
        if (error) {
            this.setState({
                message: {
                    title: 'Error loading results',
                    message: error
                }
            });
        } else {
            this.setState({ profile: response });
        }
    });
  }

  render() {
    const stacks = this.state.profile.stacks.map((stack) => {
      return (<span key={stack} className="result-stack">
          {stack}
      </span>);
  });

    return (
      <div>
        <h2> {this.state.profile.companyName} </h2>
        <h4> About </h4>
        <p> {this.state.profile.description} </p>
        <h4> Capability Stacks </h4>
        <p> {stacks} </p>
      </div>
    )
  }
}

export default Profile;