import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function stuff(state = initialState.current_user, action) {
    const data = action.payload
    switch (action.type) {
        case actionTypes.GET_CURRENT_USER:
            return { ...data, first_name: data.name.first, last_name: data.name.last }
        case actionTypes.UPDATE_USER_FULFILLED:
            return { ...data, first_name: data.name.first, last_name: data.name.last }
        default:
            return state;
    }
}
