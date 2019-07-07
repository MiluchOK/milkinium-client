import React, { Component } from 'react';
import log from 'loglevel';
import withStyles from '@material-ui/core/styles/withStyles';
import { renderTextField } from './TextField';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Button from '../components/Button';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'title',
    'password'
  ]
  requiredFields.forEach(field => {
    log.debug("Checking field ", field)
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  log.debug("Errors: ", errors)
  return errors
}

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

function CaseForm(props) {

    const { error, classes } = props;

    return (
      <form className={classes.form} onSubmit={() => {console.log("New form stuff")}}>
        <Field
            name="title"
            label="Test Case Title"
            component={renderTextField}
            type='text'
            editState={false}
            onClick={() => {console.log('sdf')}}
        />
        {error && <strong style={{color:'red'}}>{error}</strong>}
        <FieldArray name="steps" component={renderSteps} />
        <Button type="submit" color="primary" variant="contained">Save</Button>
      </form>
    )
};

CaseForm = reduxForm({
    // a unique name for the form
    form: 'case',
    validate
})(CaseForm);

export default withStyles(styles)(CaseForm);
