import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import { Typography } from '@material-ui/core';
import ProjectForm from './../components/ProjectForm';
import {createProject} from '../redux/actions/projectsActions';

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class NewProjectsScreen extends Component {

    handleCreateProject(data) {
        createProject(data)
    }

    render() {
        const { classes } = this.props;

        return(
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FolderIcon />
                    </Avatar>
                    <Typography variant="headline">
                        Create New Project
                    </Typography>
                    <ProjectForm 
                    handleCreateProject={this.handleCreateProject}
                    />
                </Paper>
            </main>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createProject: createProject
    }, dispatch)
}

// export default compose(
//     withStyles(styles, {withTheme: true}),
//     connect(null, matchDispatchToProps)
// )(Login);

export default compose(
    withStyles(styles, {withTheme: true}),
    connect(null, matchDispatchToProps)
)(NewProjectsScreen)





