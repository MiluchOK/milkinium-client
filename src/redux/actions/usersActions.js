import actionTypes from './actionTypes';
import httpClient from '../../clients/httpClient';
import authClient from '../../clients/authClient';

export const signIn = ({email, password}) => {
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

export const updateUser = (userId, data) => {
  return {
    type: actionTypes.UPDATE_USER,
    payload: httpClient.put(`/v1/users/${userId}`, data)
      .then(() => {
        return { ...data, id: userId }
      })
  }
}

export const reFetchAuthToken = () => {
  return {
    type: actionTypes.REFETCH_AUTH_TOKEN,
    payload: httpClient.get(`/v1/authenticate`)
  }
}
