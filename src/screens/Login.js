import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import {bindActionCreators} from 'redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import compose from 'recompose/compose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../components/forms/LoginForm';
import {signIn, getCurrentUser} from '../redux/actions/usersActions';
import MiddleBox from '../components/MiddleBox';

const styles = theme => ({
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
          this.props.history.push('/')
      })
      .then(() => {
          this.props.getCurrentUser();
      })
    }

    render() {

        const {classes} = this.props;

        return (
          <MiddleBox>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="headline">
                  Sign In
              </Typography>

              <LoginForm handleSignIn={this.handleSignIn}/>
           </MiddleBox>
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
