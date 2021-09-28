import React from 'react';
import ReactDOM from 'react-dom';
import './fire.css';

class Input_Personal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onPersonalChange(e.target.value);
    }

    render() {
        const name = this.props.name;
        const partner = this.props.partner;
        return (
            <div id="InputPersonal">
                <label for="Name" className="field_label">Name: </label><input type="text" onChange={this.handleChange} className="text_long" id="Name" value={name} />
                <label for="Partner" className="field_label">Partner: </label><input type="text" onChange={this.handleChange} className="text_long" id="Partner" value={partner} />

                <div>{ name }</div>
            </div>
        );
    }
}

export default Input_Personal