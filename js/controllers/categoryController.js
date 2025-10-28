import { getList } from '../models/categoryModel.js';

export const getCategoryList = async () => {
  const data = await getList();

  const formattedCategories = data.map((item) => ({
    slug: item.slug,
    title: item.title,
    url: `/index.htm?category=${item.slug}`,
  }));

  return formattedCategories;
};
