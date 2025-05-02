// services/userService.ts
import { httpClient } from '@/config/axios.config';

export const getUsersSetting = async () => {
  const response = await httpClient.get('/users');
  return response.data;
};
export const createUsersSetting = async (data: Settings) => {
  const response = await httpClient.post('/users', data); // pass data here
  return response.data;
};
export const updateUsersSetting = async (data: Settings, id: number ) => {
  const response = await httpClient.patch(`/users/${id}`, data);
  return response.data;
};
export const deleteUsersSetting = async (id: number) => {
  const { data: response } = await httpClient.delete(`/users/${id}`);
  return response.data;
};