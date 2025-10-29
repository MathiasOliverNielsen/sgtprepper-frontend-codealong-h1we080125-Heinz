import { LoginView } from '../views/organisms/loginView.js';
import { Layout } from './layoutController.js';

export const LoginPage = () => {
  const loginContainer = LoginView();

  // Get the form from the container and add event listener
  const form = loginContainer.form;
  if (form) {
    form.addEventListener('submit', (e) => {
      handleLogin(e);
    });
  }

  return Layout('', loginContainer); // Empty title to avoid duplicate h1
};

export const handleLogin = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  // Use FormData to safely get form values
  const formData = new FormData(form);
  const username = formData.get('username')?.trim();
  const password = formData.get('password')?.trim();

  if (username && password) {
    try {
      // For now, just log the attempt since AuthenticationModel isn't implemented
      console.log('Login attempt:', { username, password });
      alert('Login functionality will be implemented later');
    } catch (error) {
      console.error('Login error:', error);
      alert('Der opstod en fejl ved login');
    }
  } else {
    alert('Indtast både brugernavn og adgangskode');
  }
};
