import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';

export default function stuff(state = initialState.runs, action) {
    switch (action.type) {
        case actionTypes.GET_RUNS_FULFILLED:
            return fromJS(_.keyBy(action.payload.runs, 'id')).toJS();
        case actionTypes.GET_RUN_FULFILLED:
            return {...state, [action.payload['id']]: action.payload };
        default:
            return state
    }
}
