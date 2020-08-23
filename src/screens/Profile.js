import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field, reduxForm } from 'redux-form';
import { renderTextField } from '../components/TextField';
import ScreenHeader from "../components/ScreenHeader";
import {Avatar} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { bindActionCreators } from "redux";
import { updateUser, reFetchAuthToken } from "../redux/actions/usersActions";

const styles = theme => ({
    main: {
        flexGrow: 1
    },
    avatar: {
        width: theme.spacing.unit * 15,
        height: theme.spacing.unit * 15
    },
    field: {
        margin: theme.spacing.unit * 2
    },
    fields: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    aboutPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit * 3
    },
    content: {
        display: 'flex'
    },
    contentPaper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: 1
    },
    updateButton: {
        justifySelf: 'center'
    },
    actionsFooter: {
        display: 'flex',
        margin: theme.spacing.unit * 2,
        justifyContent: 'center'
    }
});

let ProfileForm = ({classes, current_user, handleSubmit, pristine, initialValues}) => {
    console.log({initial: initialValues})
    return <Form onSubmit={handleSubmit}>
        <div className={classes.content}>
            <Paper className={classes.contentPaper}>
                <Avatar className={classes.avatar}/>
            </Paper>
            <Paper className={classes.contentPaper}>
                <Field
                    className={classes.field}
                    required
                    label='First Name'
                    name='first_name'
                    component={renderTextField}
                    defaultValue={current_user.first_name}
                    variant='outlined'
                />
                <Field
                    className={classes.field}
                    required
                    label='Last Name'
                    name='last_name'
                    component={renderTextField}
                    defaultValue={current_user.last_name}
                    variant='outlined'
                />
                <Field
                    className={classes.field}
                    required
                    label='Email'
                    name='email'
                    component={renderTextField}
                    defaultValue={current_user.email}
                    variant='outlined'
                />
            </Paper>
        </div>
        <div className={classes.actionsFooter}>
            <Button className={classes.updateButton}
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={pristine}>
                UPDATE
            </Button>
        </div>
    </Form>
}


class Profile extends Component {

    handleSubmit = ({email, first_name, last_name}) => {
        const updateData = {
            email,
            name: {
                first: first_name,
                last: last_name
            }
        }
        this.props.updateUser(this.props.current_user._id, updateData)
        .then(() => this.props.reFetchAuthToken())
    }

    render() {

        const { classes, current_user } = this.props

        return (
            <div className={classes.main}>
                <ScreenHeader title='Profile' />
                <ProfileForm classes={classes}
                            current_user={current_user}
                            onSubmit={this.handleSubmit}
                            initialValues={current_user}
                />
            </div>
        );
    }
}

ProfileForm = reduxForm({
    form: 'profile',
    enableReinitialize: true
})(ProfileForm)

const mapStateToProps = (state) => {
    return {
        current_user: state.current_user
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUser,
        reFetchAuthToken
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Profile));

