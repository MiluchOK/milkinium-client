import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import compose from 'recompose/compose';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import LoginForm from '../components/LoginForm';
import {signIn, getCurrentUser} from '../redux/actions/usersActions';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 16,
        margin: theme.spacing.unit * 3,
    }),
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn(values) {
        this.props.signIn(values)
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
            <div>
                <Grid item>
                    <Paper elevation={4} className={classes.root}>
                        <Typography variant="headline">
                            Login
                        </Typography>

                        <LoginForm onSubmit={this.handleSignIn}/>
                    </Paper>
                </Grid>
            </div>
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
