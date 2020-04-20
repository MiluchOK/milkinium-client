import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import {Map, List, fromJS} from 'immutable';


export default function stuff(state = initialState.projects, action) {
  switch (action.type) {
    case actionTypes.GET_PROJECTS_FULFILLED:
        return {
          ...state,
          projectsById: _.keyBy(action.payload.data.projects, 'id')
        };
    case actionTypes.SELECT_PROJECT:
        const projectId = action.payload;
        // TODO Should reducer do side effects or is it an antipattern?
        localStorage.setItem('currentProject', projectId);
        return {
          ...state,
          currentProject: projectId
        };
    default:
      return state;
  }
}
