import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';

export const createSuite = (projectId, data) => {
    return {
        type: actionTypes.CREATE_SUITE,
        payload: httpClient.post(`/v1/projects/${projectId}/suites`, data)
        .then((res) => res.data)
    }
};

export const getSuites = (projectId) => {
    return {
        type: actionTypes.GET_SUITES,
        payload: httpClient.get(`/v1/projects/${projectId}/suites`)
        .then((res) => res.data)
    }
};

export const deleteSuite = (suiteId) => {
    return {
        type: actionTypes.DELETE_SUITE,
        payload: httpClient.delete(`/v1/suites/${suiteId}`)
        .then((res) => res.data)
    }
};

export const editSuite = (suiteId, data) => {
    return {
        type: actionTypes.EDIT_SUITE,
        payload: httpClient.put(`/v1/suites/${suiteId}`, data)
        .then((res) => res.data)
    }
}

export const getSuite = (suiteId) => {
  return {
    type: actionTypes.GET_SUITE,
    payload: httpClient.get(`/v1/suites/${suiteId}`)
    .then((res) => res.data)
  }
}
