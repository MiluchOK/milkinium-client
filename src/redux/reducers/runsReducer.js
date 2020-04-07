import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';

export default function stuff(state = initialState.suites, action) {
    switch (action.type) {
        case actionTypes.GET_RUNS_FULFILLED:
            const result = fromJS(_.keyBy(action.payload.runs, 'id')).toJS();
            console.log({result: result});
            return result;
        default:
            return state
    }
}
