import React, {Component} from 'react';
import _ from 'lodash';
import { Form, Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { Input } from 'material-ui';
import Select from 'material-ui/Select';


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
                value={input.value || ""}
                {...custom}
            >

                {_.map(data, (p) => (
                    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                ))}
            </Select>
        );
    }
}

export default CheckBox;
