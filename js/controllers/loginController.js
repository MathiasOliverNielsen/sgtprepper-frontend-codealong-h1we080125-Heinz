import { LoginView } from '../views/organisms/loginView.js';
import { Layout } from './layoutController.js';
import { AuthenticationModel } from '../models/loginModel.js';
import { auth } from '../services/auth.js';

export const LoginPage = () => {
  const container = LoginView();
  const form = container.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username && password) {
      const data = await AuthenticationModel(username, password);
      console.log('Login response:', data);
      if (data && (data.token || data.accessToken)) {
        const token = data.token || data.accessToken;
        auth.setToken(token);
        console.log('Token saved:', auth.getToken());
        window.location.hash = '#home';
      } else {
        alert('Login failed - check credentials');
        console.log('No token found in response:', data);
      }
    } else {
      alert('Please fill in both username and password');
    }
  });

  return Layout('', container);
};
