import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MiddleBox from './../components/MiddleBox';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import { Typography } from '@material-ui/core';
import ProjectForm from './../components/ProjectForm';
import {createProject, getProjects, selectProject} from '../redux/actions/projectsActions';

const styles = theme => ({
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

    constructor(props) {
        super(props);
        this.handleCreateProject = this.handleCreateProject.bind(this);
    }

    handleCreateProject(data) {
        let createdProject;
        this.props.createProject(data)
        .then(res => {
            createdProject = res.action.payload.data.id
            return this.props.getProjects()
        })
        .then(res => {
            return this.props.selectProject(createdProject)
        })
        .then(res => this.props.history.push('/'))
    }

    render() {
        const { classes } = this.props;

        return(
            <MiddleBox>
                <Avatar className={classes.avatar}>
                    <FolderIcon />
                </Avatar>
                <Typography variant="headline">
                    Create New Project
                </Typography>
                <ProjectForm 
                handleCreateProject={this.handleCreateProject}
                />
            </MiddleBox>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createProject: createProject,
        getProjects: getProjects,
        selectProject: selectProject
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





