import axios from 'axios';

const unauthenticatedApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthenticatedApi = () => {
  const token = localStorage.getItem('token');
  console.log('token--------', token);
  console.log('baseURL--------', import.meta.env.VITE_BASE_URL);
  
  
  const authenticatedApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return authenticatedApi;
};

export { unauthenticatedApi, getAuthenticatedApi };
