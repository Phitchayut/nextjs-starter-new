// services/userService.ts
import { httpClient } from '@/config/axios.config';

export const getUsers = async () => {
  const response = await httpClient.get('/users');
  return response.data;
};
export const getUser = async (id: number) => {
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};
export const createUser = async (data: User) => {
  const response = await httpClient.post('/users', data);
  return response.data;
};
export const updateUser = async ({ data, id }: { data: User; id: number }) => {
  const response = await httpClient.put(`/users/${id}`, data);
  return response.data;
};
export const deleteUser = async (id: number) => {
  const { data: response } = await httpClient.delete(`/users/${id}`);
  return response.data;
};
