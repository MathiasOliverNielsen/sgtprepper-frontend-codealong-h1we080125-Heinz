import { request } from '../services/fetch.js';
export const AuthenticationModel = async (username, password) => {
  try {
    const url = 'http://localhost:4000/api/auth/login';
    const data = await request(url, 'POST', { username, password });
    return data;
  } catch (error) {
    console.error(error);
  }
};
