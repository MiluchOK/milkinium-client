import React, {Component} from 'react';
import _ from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class CheckBox extends Component {


    render() {

        const { input, label, meta: { touched, error }, children, ...custom } = this.props;
        const data = custom.data;
        const first = Object.keys(data)[0];

        return (
            <Select
                style={{backgroundColor: 'white', paddingLeft: 10}}
                name={input.name}
                onBlur={input.onBlur}
                onChange={input.onChange}
                onDragStart={input.onDragStart}
                onDrop={input.onDrop}
                onFocus={input.onFocus}
                value={input.value || this.props.defaultValue || ""}
                {...custom}
            >

                {_.map(data, (p) => (
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                ))}
            </Select>
        );
    }
}

export default CheckBox;
