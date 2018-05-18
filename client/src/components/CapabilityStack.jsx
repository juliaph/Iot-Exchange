import React, { Component } from 'react';
import './CapabilityStack.css';
import api from '../api';
import { isFunction } from 'util';

class CapabilityStack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            capabilities: []
        }

        api.capability((error, response) => {
            if (error) {

            } else {
                this.setState({ capabilities: response });
            }
        });
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (isFunction(this.props.onChange)) {
            var stack = this.props.stack.slice(0);

            if (event.target.checked) {
                stack.push(event.target.value);
            } else {
                var index = stack.indexOf(event.target.value);
                if (index > -1) {
                    stack.splice(index, 1);
                }
            }
            this.props.onChange(event, stack);
        }
    }

    render() {
        const capabilities = this.state.capabilities;
        const list = capabilities.map((capability) => {
            const stacks = capability.stacks;
            const stacklist = stacks.map((stack) => {
                const isChecked = Array.isArray(this.props.stack) && this.props.stack.indexOf(stack.id + '') !== -1;
                const name = (this.props.name || 'stack') + '-' + stack.id;
                return (
                    <li key={stack.id}>
                        <label>
                            <input type="checkbox" name={name} value={stack.id} checked={isChecked} onChange={this.onChange} /> {stack.name}
                        </label>
                    </li>
                );
            });
            return (
                <div className="cstack" key={capability.id}>
                    <h3 className="cstack-name">{capability.name}</h3>
                    <ul>
                        {stacklist}
                    </ul>
                </div>
            );
        });

        return (
            <div className="cstacklist">
                {list}
            </div>
        );
    }
}

export default CapabilityStack;