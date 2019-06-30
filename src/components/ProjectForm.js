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
    form: 'project'
})(ProjectForm);

export default withStyles(styles)(ProjectForm);
