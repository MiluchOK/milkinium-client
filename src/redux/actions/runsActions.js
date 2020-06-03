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

export const addCasesToRun = (runId, caseIds) => {
    return {
        type: actionTypes.ADD_CASES_TO_RUN,
        payload: httpClient.post(`/v1/runs/${runId}/tests`, {cases: caseIds})
            .then((res) => res.data)
    }
};

export const getTests = (runId) => {
    return {
        type: actionTypes.GET_TESTS,
        payload: httpClient.get(`/v1/runs/${runId}/tests`)
            .then(res => res.data)
    }
}

export const getRun = (runId) => {
    return {
        type: actionTypes.GET_RUN,
        payload: httpClient.get(`/v1/runs/${runId}`)
            .then(res => res.data)
    }
}

