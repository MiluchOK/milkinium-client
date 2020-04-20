
export default {
    projects: {
        projectsById: {},
        currentProject: localStorage.getItem('currentProject') || ""
    },
    users: [],
    current_user: {},
    cases: {},
    suites: {},
    runs: [],
    errors: [],
};
