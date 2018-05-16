import React, { Component } from 'react';
import './Manage.css';
import CapabilityStack from '../components/CapabilityStack';
import api from '../api';
import MessageBox from '../components/MessageBox';

class ManagePartner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            stack: [],
            message: null
        };

        this.onStackSave = this.onStackSave.bind(this);
        this.onStackChange = this.onStackChange.bind(this);

        api.stack((error, response) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'Error loading stacks',
                        message: error
                    }
                });
            } else {
                this.setState({ loaded: true });
                this.setState({
                    stack: response.map((s) => {
                        return s.id + ''
                    })
                });
            }
        });
    }

    onStackSave(event) {
        api.updateStack(this.state.stack, (error) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'Error saving stacks',
                        message: error
                    }
                });
            }
        });
        event.preventDefault();
    }

    onStackChange(event, stack) {
        if (this.state.loaded) {
            this.setState({ stack: stack });
        }
    }

    render() {
        return (
            <div id="manage" className="content">
                <h1>Manage Profile</h1>

                <h2>Capability Stack</h2>
                <form onSubmit={this.onStackSave}>
                    <CapabilityStack stack={this.state.stack} onChange={this.onStackChange} />

                    <div className="buttons">
                        <button type="submit">Save Changes</button>
                    </div>
                </form>
                <MessageBox {...this.state.message} onClose={() => {
                    this.setState({ message: 'Changes have been saved.' });
                }} />
            </div>
        );
    }
}

export default ManagePartner;