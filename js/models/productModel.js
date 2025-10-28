import { request } from '../services/fetch.js';

export const getList = async (category) => {
  const url = `http://localhost:4000/api/products/${category}`;
  const data = await request(url);
  return data;
};

export const getProduct = async (category, slug) => {
  const url = `http://localhost:4000/api/products/${category}/${slug}`;
  const data = await request(url);
  return data;
};
