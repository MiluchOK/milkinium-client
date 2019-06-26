import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'

// TODO move it out and use the same render with Login Form
const renderTextField = ({
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

const styles = theme => ({

});

let NewTestCaseForm = props => {

    const { classes } = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="title"
                    label="Title"
                    component={renderTextField}
                    type="text" />
            </div>
            <div>

            </div>
            {props.children}
        </form>
    )
};

NewTestCaseForm = reduxForm({
    // a unique name for the form
    form: 'newTestCase'
})(NewTestCaseForm);

export default withStyles(styles)(NewTestCaseForm);
