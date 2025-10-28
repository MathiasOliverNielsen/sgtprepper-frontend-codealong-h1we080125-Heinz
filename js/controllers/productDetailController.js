import { getProduct } from '../models/productModel.js';
import { ProductDetailView } from '../views/organisms/productViews.js';
import { Layout } from './layoutController.js';
import { price2Dkk } from '../utils/index.js';

export const ProductDetailPage = async () => {
  // Extract category and slug from URL hash
  const hash = location.hash.slice(1) || '/';
  const pathParts = hash.split('/');

  // Expecting format: #/product/category/slug
  if (pathParts.length < 4 || pathParts[1] !== 'product') {
    return Layout('Produkt ikke fundet', 'Produktet blev ikke fundet');
  }

  const category = pathParts[2];
  const slug = pathParts[3];

  try {
    // Fetch product data
    const product = await getProduct(category, slug);

    if (!product) {
      return Layout('Produkt ikke fundet', 'Produktet blev ikke fundet');
    }

    // Format product data for display
    const formattedProduct = {
      ...product,
      stockText: product.stock ? 'På lager' : 'Forventes på lager indenfor få uger',
      stockClass: product.stock ? 'text-green-600' : 'text-red-600',
      formattedPrice: price2Dkk(product.price),
      categoryTitle: product.category?.title || '',
      brandTitle: product.brand?.title || '',
    };

    // Generate the product detail view
    const html = ProductDetailView(formattedProduct);

    // Return the layout with product details
    return Layout(product.name, html, category);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Layout('Fejl', 'Der opstod en fejl ved indlæsning af produktet');
  }
};
