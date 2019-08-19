import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS, Map } from 'immutable';

export default function stuff(state = initialState.errors, action) {
    switch (action.type) {
        case actionTypes.GET_PROJECTS_REJECTED:
            return state.push({ resource: "project", status: action.payload.response.status, critical: true })
        default:
            return state
    }
}
