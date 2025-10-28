import { Div, Form } from '../views/atoms/index.js';
import { FormGroup } from '../views/molecules/index.js';
import { Layout } from './layoutController.js';

export const LoginPage = () => {
  const form = Form();
  const username = FormGroup('Brugernavn', 'username', 'Indtast brugernavn', 'text', '');
  const password = FormGroup('Adgangskode', 'password', 'Indtast dit adgangskode', 'password', '');
  form.append(username, password);
  return Layout('Login', form);
};
