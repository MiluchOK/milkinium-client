import axios from 'axios';
import authService from './authClient';

const httpService = axios.create();
const UNAUTHORIZED = 401;

httpService.interceptors.request.use((config) => {
    config.headers.common.Authorization = `${authService.getToken()}`;
    return config;
});

httpService.interceptors.response.use(null, (config) => {
    if (config.response.status === UNAUTHORIZED && authService.isAuthenticated()) {
        authService.logOut().then(() => (window.location.href = '/'));
    }
    return Promise.reject(config);
});

export default httpService;