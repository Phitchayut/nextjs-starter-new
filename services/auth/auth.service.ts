import { httpClient } from '@/config/axios.config';

// TODO: Users API
export const getUsersAuth = async () => {
  const response = await httpClient.get('/auth/user/azure/login');
  console.log("response api: ", response);
  return response;
};