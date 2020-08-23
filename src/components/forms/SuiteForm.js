import React, { Component } from 'react';
import log from 'loglevel';
import withStyles from '@material-ui/core/styles/withStyles';
import { renderTextField } from '../TextField';
import { Field, reduxForm } from 'redux-form';
import Button from '../Button';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  submitContainer: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center'
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = [
    'title',
    'password'
  ];
  requiredFields.forEach(field => {
    log.debug("Checking field ", field)
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  log.debug("Errors: ", errors);
  return errors
};

class SuiteForm extends Component {

  render(){
    const { error, classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.props.handleSubmit(this.props.submitAction)}>
        <Field
            name="title"
            label="Suite Title"
            component={renderTextField}
            type='text'
            editState={false}
            onClick={() => {console.log('sdf')}}
        />
        {error && <strong style={{color:'red'}}>{error}</strong>}
        {this.props.children}
        <div className={classes.submitContainer}>
          <Button className={classes.submit} type="submit" color="primary" variant="contained">
            Save
          </Button>
        </div>
      </form>
    )
  }
}


SuiteForm = reduxForm({
    // a unique name for the form
    form: 'suite',
    validate,
    enableReinitialize: true
})(SuiteForm);

export default withStyles(styles)(SuiteForm);
