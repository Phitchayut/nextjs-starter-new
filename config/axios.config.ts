import axios from "axios";
import  Cookie  from 'js-cookie';

const cookie = Cookie.get('Authentication');

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; 

export const httpClient = axios.create({
  baseURL,
});
// const httpClient = axios.create({
//   baseURL,
// });

// httpClient.interceptors.request.use(
//   (config) => {
//     config.headers['Content-Type'] = 'application/json';
//     config.headers['Authorization'] = `Bearer ${cookie}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default httpClient;
