import actionTypes from '../actions/actionTypes';
import authClient from '../../clients/authClient';
import { SubmissionError } from 'redux-form'
import initialState from './initialState';

export default function stuff(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN_FULFILLED:
      const token = action.payload.data.token;
      authClient.saveToken(token);
      return state;
    case actionTypes.SIGN_IN_REJECTED:
      const error_message = action.payload.response.data.error
      throw new SubmissionError({
        _error: error_message
      })
    default:
      return state;
  }
}
