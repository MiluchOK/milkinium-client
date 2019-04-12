import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, reduxForm } from 'redux-form'

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

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

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
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
  return errors
}

function LoginForm(props) {

    const { error, classes } = props;

    return (
      <form className={classes.form} onSubmit={props.handleSubmit(props.handleSignIn)}>
        <div>
          <Field
            name="email"
            label="Email"
            component={renderTextField}
            type='email' />
        </div>
        <div>
          <Field
            name='password'
            label='Password'
            component={renderTextField}
            type='password' />
        </div>
        {error && <strong style={{color:'red'}}>{error}</strong>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
    )
};

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login',
    validate
})(LoginForm);

export default withStyles(styles)(LoginForm);
