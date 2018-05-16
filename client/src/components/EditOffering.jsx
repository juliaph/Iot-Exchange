import React, { Component } from 'react';
import CapabilitySelect from './CapabilitySelect';

class EditOffering extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <CapabilitySelect
                        name="id"
                        value={this.props.id}
                        onChange={this.props.onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <select
                        name="offeringType"
                        value={this.props.offeringType}
                        onChange={this.props.onChange}
                        required
                    >
                        <option defaultValue value="" hidden>Offering Type</option>
                        <option value="product">Product</option>
                        <option value="service">Service</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text"
                        name="offeringName"
                        value={this.props.offeringName}
                        onChange={this.props.onChange}
                        placeholder="Offering Name"
                        required
                    />
                </div>

            </div>
        );
    }
}

export default EditOffering;
