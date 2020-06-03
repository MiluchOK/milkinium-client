import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';


export const getResults = (testId) => {
    return {
        type: actionTypes.GET_RESULTS,
        payload: httpClient.get(`/v1/tests/${testId}/results`)
            .then((res) => ({...res.data, testId: testId}))
    }
};

export const addResult = (testId, data) => {
    return {
        type: actionTypes.ADD_RESULT,
        payload: httpClient.post(`/v1/tests/${testId}/results`, data)
            .then(res => res.data)
    }
}