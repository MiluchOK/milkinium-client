import React, { Component } from 'react';
import log from 'loglevel';
import TextField from '@material-ui/core/TextField';

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
