import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function stuff(state = initialState.loaders, action) {

    const the_split = action.type.split('_')

    if(['PENDING', 'FULFILLED', 'REJECTED'].includes(the_split[the_split.length - 1])){
        const action_name = the_split.slice(0, the_split.length-1).join('_')

        if (the_split[the_split.length-1] === 'PENDING') {
            return {...state, ...{[action_name]: true}}
        } else {
            return {...state, ...{[action_name]: false}}
        }
    }

    return state
}

