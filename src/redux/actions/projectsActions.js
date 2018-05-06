import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';

export const selectProject = (projectId) => {
    return {
        type: actionTypes.SELECT_PROJECT,
        payload: projectId
    }
};

export const getProjects = () => {
    return {
        type: actionTypes.GET_PROJECTS,
        payload: httpClient.get('/projects').then((res) => res.data)
    }
};
