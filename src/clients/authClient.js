import httpClient from './httpClient';

const TOKEN = 'milkinium_token'

const retrieveToken = () => {
  return localStorage.getItem(TOKEN);
};

class AuthClient {
  isAuthenticated() {
    // TODO Actually check the token
    return retrieveToken();
  }

  saveToken(token) {
    localStorage.setItem(TOKEN, token);
    //TODO Find a better place for this call
    return httpClient.get('/v1/whoAmI');
  }

  getToken() {
    return retrieveToken();
  }

  getUserData() {
    //Decode the token
      const token = retrieveToken();
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      const data =  JSON.parse(window.atob(base64));
      return data.data;
  }

  logOut() {
    return new Promise((res) => {
      localStorage.removeItem(TOKEN);
      res();
    });
  }
}

export default new AuthClient();
