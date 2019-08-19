import {Map, List, fromJS} from 'immutable';

export default {
    projects: Map({
        projectsById: {},
        currentProject: localStorage.getItem('currentProject') || ""
    }),
    users: List(),
    current_user: Map(),
    cases: Map(),
    suites: Map(),
    errors: List()
};
