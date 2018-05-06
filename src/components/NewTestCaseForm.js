import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Field, reduxForm } from 'redux-form'

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);


let NewTestCaseForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="title"
                    component={renderTextField}
                    type="text" />
            </div>

            {props.children}
        </form>
    )
};

NewTestCaseForm = reduxForm({
    // a unique name for the form
    form: 'newTestCase'
})(NewTestCaseForm);

export default NewTestCaseForm;
