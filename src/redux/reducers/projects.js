import _ from 'lodash';
import initialState from './initialState';
import actionTypes from '../actions/actionTypes';
import {Map, List, fromJS} from 'immutable';


export default function stuff(state = initialState.projects, action) {
  switch (action.type) {
      case actionTypes.GET_PROJECTS_FULFILLED:
        const h = _.keyBy(action.payload.data.projects, 'id');
        return state.set('projectsById', h);
      case actionTypes.SELECT_PROJECT:
        const projectId = action.payload
        localStorage.setItem('currentProject', projectId);
        return state.set('currentProject', projectId);
    default:
      return state;
  }
}
