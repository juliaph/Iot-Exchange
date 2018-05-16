import React, { Component } from 'react';
import './Manage.css';

import api from '../api';
import EditOffering from '../components/EditOffering';
import MessageBox from '../components/MessageBox';

class ManageVendor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            offeringType: '',
            offeringName: '',
            stack: [],
            message: null
        };

        this.refresh();

        this.onChange = this.onChange.bind(this);
        this.onAddOffering = this.onAddOffering.bind(this);
    }

    refresh() {
        api.stack((error, response) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'Error loading stacks',
                        message: error
                    }
                });
            } else {
                this.setState({ stack: response });
            }
        });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onAddOffering(event) {
        api.updateOffering(this.state, (error) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'Error creating new offering',
                        message: error
                    }
                });
            } else {
                this.refresh();
            }

            this.setState({
                id: '',
                offeringType: '',
                offeringName: '',
            });
        });
        event.preventDefault();
    }

    onRemove(event, id) {
        api.removeOffering(id, (error) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'Error removing offering',
                        message: error
                    }
                });
            } else {
                this.refresh();
            }
        });
        event.preventDefault();
    }

    render() {
        const resultList = this.state.stack.map((result) => {
            const data = JSON.parse(result.data) || {
                offeringType: '',
                offeringName: ''
            };
            return (
                <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{data.offeringType}</td>
                    <td>{data.offeringName}</td>
                    <td>
                        <form onSubmit={(event) => { return this.onRemove(event, result.id); }}>
                            <button type="submit">remove</button>
                        </form>
                    </td>
                </tr>
            );
        });
        return (
            <div id="manage" className="content">
                <h1>Manage Profile</h1>

                <h2>Offerings</h2>
                <div className="row">
                    <div className="view">
                        <h3>Offerings</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Stack</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultList}
                            </tbody>
                        </table>
                    </div>
                    <div className="sidebar">
                        <form className="form" onSubmit={this.onAddOffering}>
                            <h3>Create new offering</h3>
                            <hr />
                            <EditOffering onChange={this.onChange} {...{
                                id: this.state.id,
                                offeringType: this.state.offeringType,
                                offeringName: this.state.offeringName
                            }} />
                            <div className="buttons">
                                <button type="submit">Add Offering</button>
                            </div>
                        </form>
                    </div>
                </div>
                <MessageBox {...this.state.message} onClose={() => {
                    this.setState({ message: 'Changes have been saved' });
                }} />
            </div>
        );
    }
}

export default ManageVendor;