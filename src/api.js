import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_POLYGON_BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use(
    (config) => {
        const authToken = process.env.REACT_APP_POLYGON_KEY;

        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Axios error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;
