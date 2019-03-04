import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import {bindActionCreators} from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import compose from 'recompose/compose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../components/LoginForm';
import {signIn, getCurrentUser} from '../redux/actions/usersActions';
import { SubmissionError } from 'redux-form'

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  }
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn(values) {
      return this.props.signIn(values)
      .then((res) => {
          console.log(res);
          this.props.history.push('/')
      })
      .then(() => {
          this.props.getCurrentUser();
      })
    }

    render() {

        const {classes} = this.props;

        return (
          <main className={classes.main}>
            <Paper elevation={4} className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="headline">
                    Sign In
                </Typography>

                <LoginForm handleSignIn={this.handleSignIn}/>
            </Paper>
          </main>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn: signIn,
        getCurrentUser: getCurrentUser
    }, dispatch)
}

export default compose(
    withStyles(styles, {withTheme: true}),
    connect(null, matchDispatchToProps)
)(Login);
