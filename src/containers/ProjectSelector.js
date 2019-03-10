import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Field, reduxForm} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {InputLabel} from '@material-ui/core/Input';
import {MenuItem} from '@material-ui/core/Menu';
import {FormControl} from '@material-ui/core/FormControl';
import {bindActionCreators} from 'redux';
import {Input} from '@material-ui/core/Input';
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
        const currentProject = this.props.currentProject

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

ProjectSelector = reduxForm({
    // a unique name for the form
    form: 'projectSelector'
})(ProjectSelector);

const mapStateToProps = (state) => {
    const pbid = state.projects.get('projectsById');
    const currentProject = state.projects.get('currentProject');
    return {
        allProjects: pbid,
        currentProject: currentProject
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectProject: selectProject
    }, dispatch)
}

ProjectSelector = withStyles(styles)(ProjectSelector);
export default connect(mapStateToProps, matchDispatchToProps)(ProjectSelector);
