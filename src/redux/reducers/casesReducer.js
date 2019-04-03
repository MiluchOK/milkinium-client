import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS, Map } from 'immutable';

export default function stuff(state = initialState.cases, action) {
    switch (action.type) {
        case actionTypes.GET_CASES_FULFILLED:
            const h = fromJS(_.keyBy(action.payload.cases, 'id'));
            state = state.set('casesById', h);
            return state;
        case actionTypes.GET_CASE_FULFILLED:
            const caseData = action.payload
            const cazes = state.get('casesById')
                .set(caseData.id, caseData)
            return state.set('casesById', cazes)
        default:
            return state;
    }
}
