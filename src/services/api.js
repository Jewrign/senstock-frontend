import axios from 'axios';

const api = axios.create({
  baseURL: 'https://senstock-backend.onrender.com',
  withCredentials: true, // Important pour les cookies
});

export async function initCsrf() {
  await api.get('/sanctum/csrf-cookie');
}

export default api;
