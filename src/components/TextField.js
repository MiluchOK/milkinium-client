import React, { Component } from 'react';
import log from 'loglevel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/Delete';

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

export const renderDeletableTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
    }) => (
    <div>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={11}>
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
            </Grid>
            <Grid item xs={1}>
                <Delete onClick={() => {custom.removeAction()}}/>
            </Grid>
        </Grid>
    </div>
)
