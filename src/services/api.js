import axios from 'axios';

const api = axios.create({
  baseURL: 'https://senstock-backend.onrender.com/api',
});

export default api;
