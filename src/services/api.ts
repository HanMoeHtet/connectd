import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL!,
});

export const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeToken = () => {
  api.defaults.headers.common['Authorization'] = '';
};

export default api;
