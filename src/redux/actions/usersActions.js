import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';
import authClient from '../../clients/authClient';

export const signIn = ({email, password}) => {
  console.log('Authenticating with ' + email + ' and ' + password)
  return {
    type: actionTypes.SIGN_IN,
    payload: httpClient.post('/v1/authenticate', {email, password})
  }
};

export const getCurrentUser = () => {
  return {
    type: actionTypes.GET_CURRENT_USER,
    payload: authClient.getUserData
  }
};
