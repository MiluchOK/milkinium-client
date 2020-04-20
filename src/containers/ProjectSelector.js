import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import CheckBox from '../components/CheckBox';
import { selectProject } from '../redux/actions/projectsActions'

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class ProjectSelector extends Component {

    render() {

        const projects = this.props.allProjects;
        const currentProject = this.props.currentProject;

        return (
            <form>
                <Field
                    name="projects"
                    id="projects"
                    component={CheckBox}
                    data={projects}
                    label="Projects"
                    onChange={(e, newValue) => {this.props.selectProject(newValue)}}
                    type="string"
                    defaultValue={currentProject}
                    margin="none"
                />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allProjects: state.projects.projectsById,
        currentProject: state.projects.currentProject
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectProject: selectProject
    }, dispatch)
}

ProjectSelector = connect(mapStateToProps, matchDispatchToProps)(ProjectSelector);
ProjectSelector = withStyles(styles)(ProjectSelector);
export default ProjectSelector = reduxForm({
    // a unique name for the form
    form: 'projectSelector'
})(ProjectSelector);
