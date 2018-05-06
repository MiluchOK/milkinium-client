import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function stuff(state = initialState.cases, action) {
    switch (action.type) {
        case actionTypes.GET_CASES_FULFILLED:
            const h = _.keyBy(action.payload, '_id');
            state = state.set('casesById', h);
            return state;
        default:
            return state;
    }
}
