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


let LoginForm = props => {
    return (
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field
                name="email"
                component={renderTextField}
                type="email" />
          </div>
          <div>
            <Field
              name="password"
              component={renderTextField}
              type="password" />
          </div>
          <Button variant="raised" color="primary" type="submit">Sign In</Button>
      </form>
    )
};

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);

export default LoginForm;
