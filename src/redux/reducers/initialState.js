import {Map, List, fromJS} from 'immutable';

export default {
    projects: Map({
        projectsById: {},
        currentProject: ""
    }),
    users: List(),
    current_user: Map(),
    cases: Map({
        casesById: {}
    })
};