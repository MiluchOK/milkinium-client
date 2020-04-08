import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';

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
      'name'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.name &&
      !/^[a-zA-Z0-9 ]{3,22}$/i.test(values.name)
    ) {
      errors.name = 'Invalid project name'
    }
    return errors
}

function ProjectForm(props) {
    const { error, classes } = props;

    return (
        <form className={classes.form} noValidate autoComplete="off" onSubmit={props.handleSubmit(props.handleCreateProject)}>
            <div>
                <Field
                    name="name"
                    label="Project Name"
                    component={renderTextField}
                    type='text'
                />
            </div>
            {error && <strong style={{color:'red'}}>{error}</strong>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
            Create
          </Button>
        </form>
    )
};

ProjectForm = reduxForm({
    // a unique name for the form
    form: 'project',
    validate
})(ProjectForm);

export default withStyles(styles)(ProjectForm);
