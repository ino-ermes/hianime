import axios from 'axios';

const baseURL = '/api/v1';

export const client = axios.create({
  baseURL: baseURL,
});

let authClient = client;

export const removeAuthClient = () => {
  localStorage.removeItem('user_token');
  authClient = client;
};

export const setAuthClient = (token: string) => {
  authClient = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.setItem('user_token', token);
};

export const setAndGetAuthClient = () => {
  const token = localStorage.getItem('user_token');
  if (token) {
    authClient = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return authClient;
  } else {
    return undefined;
  }
};

export const getAuthClient = () => {
  return authClient;
};
