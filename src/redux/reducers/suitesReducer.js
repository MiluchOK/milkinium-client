import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS, Map } from 'immutable';

export default function stuff(state = initialState.suites, action) {
    switch (action.type) {
        case actionTypes.GET_SUITES_FULFILLED:
            return fromJS(_.keyBy(action.payload.suites, 'id'))
        case actionTypes.GET_SUITE_FULFILLED:
            // const caseData = fromJS(action.payload)
            // var newObj = Map()
            // newObj = newObj.set(caseData.get('id'), caseData)
            // const cazes = state.merge(newObj)
            // return cazes
            return {...state, }
        case actionTypes.EDIT_SUITE_FULFILLED:
            // const newCaseData = action.payload.data
            // const caseId = newCaseData.id
            // return state.set(caseId, fromJS(newCaseData))
            return state

        default:
            return state
    }
}
