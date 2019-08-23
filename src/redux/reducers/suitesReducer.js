import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import { fromJS, Map } from 'immutable';

export default function stuff(state = initialState.suites, action) {
    switch (action.type) {
        case actionTypes.GET_SUITES_FULFILLED:
            console.log(fromJS(_.keyBy(action.payload.suites, 'id')))
            return fromJS(_.keyBy(action.payload.suites, 'id'))
        case actionTypes.GET_SUITE_FULFILLED:
            const suiteData = fromJS(action.payload)
            var newObj = Map()
            newObj = newObj.set(suiteData.get('id'), suiteData)
            return state.merge(newObj)
        case actionTypes.EDIT_SUITE_FULFILLED:
            // const newCaseData = action.payload.data
            // const caseId = newCaseData.id
            // return state.set(caseId, fromJS(newCaseData))
            return state

        default:
            return state
    }
}
