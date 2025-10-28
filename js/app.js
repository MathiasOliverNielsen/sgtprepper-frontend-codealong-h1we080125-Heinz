import { HomePage } from './controllers/homeController.js';
import { ProductPage } from './controllers/productController.js';
import { LoginPage } from './controllers/loginController.js'; // Add this import
import { router } from './router/index.js';

router(
  {
    '/': () => ProductPage(), // Forside
    '/login': () => LoginPage(), // Login page
  },
  '#app'
);
