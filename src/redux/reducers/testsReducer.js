import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';

function addResults(state, testId, results) {
    const updatedTest = {...state[testId], results: results}
    return {...state, [testId]: updatedTest}
}

export default function stuff(state = initialState.tests, action) {
    switch (action.type) {
        case actionTypes.GET_TESTS_FULFILLED:
            return _.keyBy(action.payload.tests, 'id');
        case actionTypes.GET_RESULTS_FULFILLED:
            return addResults(state, action.payload.testId, action.payload.results)
        default:
            return state
    }
}

