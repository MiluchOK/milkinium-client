import httpClient from './httpClient';

const retrieveToken = () => {
  return localStorage.getItem('token');
};

class AuthClient {
  isAuthenticated() {
    // TODO Actually check the token
    return retrieveToken();
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    //TODO Find a better place for this call
    return httpClient.get('/whoAmI');
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
      // return {
      //   name: {
      //     first: "Alex",
      //     last: "Milk"
      //   },
      //   email: "amilyukov@gmail.com"
      // }
  }

  logOut() {
    return new Promise((res) => {
      localStorage.removeItem('token');
      res();
    });
  }
}

export default new AuthClient();
