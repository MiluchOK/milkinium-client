import actionTypes from '../actions/actionTypes';
import authClient from '../../clients/authClient';
import { SubmissionError } from 'redux-form'
import initialState from './initialState';

export default function stuff(state = initialState.users, action) {

  const saveTokenActions = [actionTypes.SIGN_IN_FULFILLED, actionTypes.REFETCH_AUTH_TOKEN_FULFILLED]
  if( saveTokenActions.includes(action.type) ) {
    authClient.saveToken(action.payload.data.token);
  }

  switch (action.type) {
    case actionTypes.SIGN_IN_REJECTED:
      const error_message = action.payload.response.data.error
      throw new SubmissionError({
        _error: error_message
      })
    default:
      return state;
  }
}
