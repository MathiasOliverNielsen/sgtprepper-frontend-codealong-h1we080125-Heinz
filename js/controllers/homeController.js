import { Div, Heading, Paragraph } from '../views/atoms/index.js';
import { Layout } from './layoutController.js';
import { getList } from '../models/productModel.js';
import { ProductListView } from '../views/organisms/productViews.js';

export const HomePage = async () => {
  const title = 'Velkommen til Sgt. Prepper';

  const container = Div('space-y-8');

  // Welcome message
  const welcome = Div('text-center py-8 bg-slate-100 rounded-lg');
  const welcomeTitle = Heading('Velkommen til Sgt. Prepper', 2, 'text-3xl font-bold text-gray-800 mb-4');
  const welcomeText = Paragraph('text-lg text-gray-600');
  welcomeText.innerText = 'Din pålidelige partner til overlevelsesudstyr og beredskab';
  welcome.append(welcomeTitle, welcomeText);
  container.append(welcome);

  try {
    // Featured products from water category
    const waterProducts = await getList('vand-og-vandrensning');

    if (waterProducts && waterProducts.length > 0) {
      const featuredSection = Div('');
      const sectionTitle = Heading('Udvalgte Produkter - Vand og Vandrensning', 2, 'text-2xl font-bold text-gray-800 mb-6');
      featuredSection.append(sectionTitle);

      // Show first 3 products with stock info
      const featuredProducts = waterProducts.slice(0, 3).map((item) => ({
        ...item,
        category: 'vand-og-vandrensning',
        stockText: item.stock > 0 ? `${item.stock} på lager` : 'Forventes på lager indenfor få uger',
        stockClass: item.stock > 10 ? 'text-green-600' : item.stock > 0 ? 'text-orange-500' : 'text-red-600',
      }));

      const productsView = ProductListView(featuredProducts);
      featuredSection.append(productsView);
      container.append(featuredSection);
    }
  } catch (error) {
    console.error('Error loading featured products:', error);
    const errorMsg = Paragraph('text-red-600');
    errorMsg.innerText = 'Kunne ikke indlæse produkter';
    container.append(errorMsg);
  }

  return await Layout(title, container);
};
