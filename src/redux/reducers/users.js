import actionTypes from '../actions/actionTypes';
import authClient from '../../clients/authClient';
import initialState from './initialState';

export default function stuff(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN_FULFILLED:
      const token = action.payload.data.token;
      authClient.saveToken(token);
      return state;
    default:
      return state;
  }
}
