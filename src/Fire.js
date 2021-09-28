import React from 'react';
import Input_Personal from './Input_Personal';

class Fire extends React.Component {
    constructor(props) {
        super(props);
        this.onPersonalChange = this.onPersonalChange.bind(this);
        this.state = {
            name: null,
            partner: null
        };
    }

    onPersonalChange(value) {
        this.setState({ name: value });
    }

    render() {
        return (
            <div>
                <Input_Personal name={this.state.name} partner={this.state.partner} onPersonalChange={this.onPersonalChange} />
            </div>
        );
    }
}

export default Fire;