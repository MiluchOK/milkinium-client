import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux';
import CheckBox from '../components/CheckBox';
import { selectProject } from '../redux/actions/projectsActions'

const ProjectSelector = props => {

    const { allProjects, currentProject, selectProject } = props

    const sorted_projects = Object.entries(allProjects)
        .sort((a, b) => (a[1].name < b[1].name) ? 1 : -1)
    const first_project = sorted_projects[0]

    if (!currentProject) {
        selectProject(first_project[0])
    }

    return (
        <form>
            <Field
                name="projects"
                id="projects"
                component={CheckBox}
                data={allProjects}
                label="Projects"
                onChange={(e, newValue) => {selectProject(newValue)}}
                type="string"
                defaultValue={currentProject}
                margin="none"
            />
        </form>
    );
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

export default reduxForm({form: 'projectSelector'})(connect(mapStateToProps, matchDispatchToProps)(ProjectSelector));
