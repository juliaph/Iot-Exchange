import React, { Component } from 'react';
import './MessageBox.css';
import { isFunction, isArray } from 'util';

class MessageBox extends Component {
    constructor() {
        super();

        this.onClose = this.onClose.bind(this);
    }

    onClose(event) {
        if (isFunction(this.props.onClose)) {
            this.props.onClose(event);
        }
    }

    render() {
        const message = isArray(this.props.message) ? (
            <ul>
                {this.props.message.map((m) =>
                    <li key={m}>{m}</li>
                )}
            </ul>
        ) : this.props.message ? (
            <p>
                {this.props.message}
            </p>) :
                null;
        return this.props.message ? (
            <div className="modal">
                <div className="modal-bg"></div>
                <div className="modal-dialog">
                    <div className="modal-title">
                        {this.props.title}
                        <button className="close" type="button" onClick={this.onClose}>x</button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                </div>
            </div>
        ) : null;
    }
}

export default MessageBox;
