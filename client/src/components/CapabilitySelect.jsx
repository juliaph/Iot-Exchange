import React, { Component } from 'react';
import api from '../api';
import { isFunction } from 'util';

class CapabilitySelect extends Component {
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
                return (
                    <option key={stack.id} value={stack.id}>{stack.name}</option>
                );
            });
            return (
                <optgroup key={capability.id} label={capability.name}>
                    {stacklist}
                </optgroup>
            );
        });

        return (
            <select {...this.props}>
                <option defaultValue hidden value=''>Select Capability</option>
                {list}
            </select>
        );
    }
}

export default CapabilitySelect;