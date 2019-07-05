import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';

export const createCase = (projectId, data) => {
    return {
        type: actionTypes.CREATE_CASE,
        payload: httpClient.post(`/v1/projects/${projectId}/cases`, data)
        .then((res) => res.data)
    }
};

export const getCases = (projectId) => {
    return {
        type: actionTypes.GET_CASES,
        payload: httpClient.get(`/v1/projects/${projectId}/cases`)
        .then((res) => res.data)
    }
};

export const deleteCase = (caseId) => {
    return {
        type: actionTypes.DELETE_CASE,
        payload: httpClient.delete(`/v1/cases/${caseId}`)
        .then((res) => res.data)
    }
};

export const editCase = (caseId, data) => {
    return {
        type: actionTypes.EDIT_CASE,
        payload: httpClient.put(`/v1/cases/${caseId}`, data)
    }
}

export const getCase = (caseId) => {
  return {
    type: actionTypes.GET_CASE,
    payload: httpClient.get(`/v1/cases/${caseId}`)
    .then((res) => res.data)
  }
}
