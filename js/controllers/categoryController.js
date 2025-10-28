import { getList } from '../models/categoryModel.js';

export const getCategoryList = async () => {
  const data = await getList();

  const formattedCategories = data.map((item) => ({
    slug: item.slug,
    title: item.title,
    url: `#/?category=${item.slug}`, // Fix: use hash routing with query parameter
  }));

  return formattedCategories;
};
