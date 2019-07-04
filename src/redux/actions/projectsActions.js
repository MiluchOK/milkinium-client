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
        payload: httpClient.get('/v1/projects')
    }
};

export const createProject = (data) => {
  return {
    type: actionTypes.CREATE_PROJECT,
    payload: httpClient.post('/v1/projects', data)
  }
}