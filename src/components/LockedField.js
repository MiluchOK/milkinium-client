import React, { Component } from 'react';

class LockedField extends Component {
    render() {
        return(
            <div onClick={this.props.onClick}>
                {this.props.value}
            </div>
        )
    }
}

export default LockedField;