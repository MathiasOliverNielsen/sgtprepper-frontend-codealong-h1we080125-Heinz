import { getList } from '../models/productModel.js';
import { ProductListView } from '../views/organisms/productViews.js';
import { Layout } from './layoutController.js';

export const ProductPage = async () => {
  // Parse category from hash URL parameters
  const hash = location.hash.slice(1) || '/';
  const urlParams = new URLSearchParams(hash.split('?')[1] || '');
  const category = urlParams.get('category') || 'vand-og-vandrensning';

  // Bygger produkt liste
  const data = await getList(category);

  const formattedProducts = data.map((item) => ({
    ...item,
    category, // Add category to each product for linking
    stockText: item.stock ? 'På lager' : 'Forventes på lager indenfor få uger',
    stockClass: item.stock ? 'text-green-600' : 'text-red-600',
  }));

  const html = ProductListView(formattedProducts);

  // Samler og returnerer side layoutet
  const layout = Layout('Produkter', html);
  return layout;
};
