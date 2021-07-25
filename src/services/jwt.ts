import { setToken as _setToken, removeToken as _removeToken } from './api';

const TOKEN_NAME = `${process.env.REACT_APP_NAME!}-access-token`;

export const setToken = (token: string) => {
  _setToken(token);
  localStorage.setItem(TOKEN_NAME, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const removeToken = () => {
  _removeToken();
  localStorage.removeItem(TOKEN_NAME);
};
