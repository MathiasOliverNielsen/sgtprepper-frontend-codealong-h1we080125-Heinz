import { LoginView } from '../views/organisms/loginView.js';
import { Layout } from './layoutController.js';

export const LoginPage = () => {
  const loginForm = LoginView();

  loginForm.addEventListener('submit', (e) => {
    handleLogin(e);
  });

  return Layout('', loginForm); // Empty title to avoid duplicate h1
};

export const handleLogin = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  const username = form.username.value.trim();
  const password = form.password.value.trim();

  if (username && password) {
    const data = await AuthenticationModel(username, password);
    console.log(data);
  }
};
