import React, { Component } from 'react';
import log from 'loglevel';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, reduxForm } from 'redux-form'
import { renderFlipperTextField } from './TextField';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
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

function CaseForm(props) {

    const { error, classes } = props;

    return (
      <form className={classes.form} onSubmit={() => {console.log("New form stuff")}}>
        <Field
            name="title"
            label="Test Case Title"
            component={renderFlipperTextField}
            type='text'
            editState={false}
            onClick={() => {console.log('sdf')}}
        />
        {log.debug("CaseForm error: ", error)}
        {error && <strong style={{color:'red'}}>{error}</strong>}
        </form>
    )
};

CaseForm = reduxForm({
    // a unique name for the form
    form: 'case',
    validate
})(CaseForm);

export default withStyles(styles)(CaseForm);
