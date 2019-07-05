import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS, Map } from 'immutable';

export default function stuff(state = initialState.cases, action) {
    switch (action.type) {
        case actionTypes.GET_CASES_FULFILLED:
            return fromJS(_.keyBy(action.payload.cases, 'id'))
        case actionTypes.GET_CASE_FULFILLED:
            const caseData = fromJS(action.payload)
            var newObj = Map()
            newObj = newObj.set(caseData.get('id'), caseData)
            const cazes = state.merge(newObj)
            return cazes
        case actionTypes.EDIT_CASE_FULFILLED:
            const newCaseData = action.payload.data
            const caseId = newCaseData.id
            return state.set(caseId, fromJS(newCaseData))

        default:
            return state
    }
}
