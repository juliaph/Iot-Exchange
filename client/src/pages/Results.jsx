import React, { Component } from 'react';
import PartnerResult from '../components/PartnerResult';
import api from '../api';
import MessageBox from '../components/MessageBox';

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            message: null
        };

        const stack = this.props.match.params.query.split(',');
        api.search(this.props.match.params.type, stack, (error, response) => {
            if (error) {
                this.setState({
                    message: {
                        title: 'Error loading results',
                        message: error
                    }
                });
            } else {
                this.setState({ results: response });
            }
        });
    }

    render() {
        const resultList = this.state.results.map((result) => {
            return (
                <PartnerResult key={result.id} {...result} />
            );
        });
        return (
            <div>
                <h1>Search results</h1>
                <div className="results">
                    {resultList}
                </div>
                <MessageBox {...this.state.message} onClose={() => {
                    this.setState({ message: null });
                }} />
            </div>
        );
    }
}

export default Results;
