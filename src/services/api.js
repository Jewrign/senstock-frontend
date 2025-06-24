import axios from 'axios';

const api = axios.create({
  baseURL: 'https://senstock-backend.onrender.com/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Configuration pour gérer les cookies
document.cookie.split(';').forEach(function(c) {
  document.cookie = c
    .replace(/^ +/, '')
    .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
});

// Intercepteur pour ajouter le header Referer
api.interceptors.request.use(config => {
  config.headers['Referer'] = window.location.origin;
  return config;
});

export const initCsrf = () =>
  axios.get('https://senstock-backend.onrender.com/sanctum/csrf-cookie').then((response) => {
    console.log(response);
    return response;
  });

export default api;
