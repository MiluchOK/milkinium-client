import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, FieldArray, reduxForm } from 'redux-form'

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

const renderSteps = ({ fields, meta: { error, submitFailed } }) => (
    <div>
      <button type="button" onClick={() => fields.push({})}>
        Add Step
      </button>
      {submitFailed && error && <span>{error}</span>}
    
    {fields.map((step, index) => (
        <Field
          name={`${step}.body`}
          type="text"
          component={renderTextField}
          label={`Step ${index}`}
        />
    ))}
    </div>
)

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
                <FieldArray name="steps" component={renderSteps} />
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
