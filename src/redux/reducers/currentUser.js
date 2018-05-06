import { Map, List, fromJS } from 'immutable';
import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function stuff(state = initialState.current_user, action) {
    switch (action.type) {
        case actionTypes.GET_CURRENT_USER:
            //TODO Need refactoring, it is bad, but who cares are the moment
            return Map({
                name: action.payload.name.first + " " + action.payload.name.last,
                email: action.payload.email,
                avatar: action.payload.avatar
            });
        default:
            return state;
    }
}
