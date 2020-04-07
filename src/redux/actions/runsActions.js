import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';


export const getRuns = (projectId) => {
    return {
        type: actionTypes.GET_RUNS,
        payload: httpClient.get(`/v1/projects/${projectId}/runs`)
            .then((res) => res.data)
    }
};

export const createRun = (projectId, data) => {
    return {
        type: actionTypes.CREATE_RUN,
        payload: httpClient.post(`/v1/projects/${projectId}/runs`, data)
            .then((res) => res.data)
    }
};

export const deleteRun = (runId) => {
    return {
        type: actionTypes.DELETE_RUN,
        payload: httpClient.delete(`/v1/cases/${runId}`)
            .then((res) => res.data)
    }
};
