import { HomePage } from './controllers/homeController.js';
import { ProductPage } from './controllers/productController.js';
import { ProductDetailPage } from './controllers/productDetailController.js'; // Add product detail import
import { LoginPage } from './controllers/loginController.js';
import { CartPage } from './controllers/cartController.js'; // Add cart import
import { router } from './router/index.js';
import { initializeCartListeners } from './controllers/cartController.js'; // Initialize cart listeners

// Custom router function to handle product detail routes
const handleRoute = () => {
  const hash = location.hash.slice(1) || '/';

  // Handle product detail routes: #/product/category/slug
  if (hash.startsWith('/product/')) {
    return ProductDetailPage();
  }

  // Handle other routes
  const routes = {
    '/': () => ProductPage(), // Forside
    '/login': () => LoginPage(), // Login page
    '/cart': () => CartPage(), // Cart page
  };

  const route = routes[hash] || routes['/'];
  return route();
};

router(
  {
    '/': handleRoute,
    '*': handleRoute, // Catch-all for any route pattern
  },
  '#app'
);

// Initialize cart event listeners when app starts
initializeCartListeners();
