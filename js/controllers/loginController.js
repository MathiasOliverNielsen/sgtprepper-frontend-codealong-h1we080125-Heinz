import { Div } from '../views/atoms/index.js';
import { Layout } from './layoutController.js';

export const LoginPage = () => {
  const div = Div;
  div.textContent = 'Her kan du logge ind';
  return Layout('Login', div);
};
