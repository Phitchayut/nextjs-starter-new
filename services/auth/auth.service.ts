// services/userService.ts
import { httpClient } from '@/config/axios.config';
import axios from 'axios';

export const getUser = async () => {
  const response = await axios.get('http://localhost:3000/api/menu');
  return response.data;
};
