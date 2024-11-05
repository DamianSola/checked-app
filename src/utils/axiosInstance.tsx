import axios from 'axios';
import Cookies from 'js-cookie'; // Importar js-cookie

const axiosInstance = axios.create({
  
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // URL del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    // const token = localStorage.getItem('token'); // Obtiene el token JWT desde localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Agrega el token a los headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

