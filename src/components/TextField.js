import React, { Component } from 'react';
import log from 'loglevel';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import LockedField from './LockedField';

export const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
    }) => (
    <div>
        <TextField
        label={label}
        placeholder={label}
        fullWidth={true}
        required={true}
        margin={"normal"}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
    </div>
)

export const renderFlipperTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
    }) => {
    const editableField = <TextField
        label={label}
        placeholder={label}
        fullWidth={true}
        required={true}
        margin={"normal"}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
    const lockedField = <LockedField 
        onClick={custom.onClick}
        value="goo"
    />
    let field;
    if(custom.editState) {
        field = editableField
    }
    else {
        field = lockedField
    }
    return(
        <div>
            {
                field
            }
        </div>
    )
}