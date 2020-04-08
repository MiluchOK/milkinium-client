import React, { Component } from 'react';
import log from 'loglevel';
import withStyles from '@material-ui/core/styles/withStyles';
import { renderTextField , renderDeletableTextField} from '../TextField';
import { Field, FieldArray, reduxForm } from 'redux-form';
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
  const errors = {}
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

const renderSteps = ({ fields, meta: { error, submitFailed } }) => {
  return(
    <div>
      {submitFailed && error && <span>{error}</span>}
      {fields.map((step, index) => (
          <Field
            name={`${step}.body`}
            type="text"
            component={renderDeletableTextField}
            label={`Step ${index+1}`}
            removeAction={() => fields.remove(index)}
          />
      ))}
      <Button variant="contained" onClick={() => fields.push({})}>Add Step</Button>
    </div>
  )
};

class CaseForm extends Component {

  render(){
    const { error, classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.props.handleSubmit(this.props.submitAction)}>
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
        <div className={classes.submitContainer}>
          <Button className={classes.submit} type="submit" color="primary" variant="contained">
            Save
          </Button>
        </div>
      </form>
    )
  }
};


CaseForm = reduxForm({
    // a unique name for the form
    form: 'case',
    validate,
    enableReinitialize: true,
    initialValues: {
      steps: [{}]
    }
})(CaseForm);

export default withStyles(styles)(CaseForm);
