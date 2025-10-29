import { Div, Form, Button, Heading } from '../atoms/index.js';
import { FormGroup } from '../molecules/index.js';

export const LoginView = () => {
  // Create main container
  const container = Div('max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200');

  // Add form title
  const title = Heading('Log ind', 2, 'text-2xl font-bold text-center text-gray-800 mb-6');
  container.append(title);

  // Create form
  const form = Form('POST');
  form.className = 'space-y-4';

  // Add form fields
  const username = FormGroup('Brugernavn', 'username', 'Indtast brugernavn', 'text', '');
  const password = FormGroup('Adgangskode', 'password', 'Indtast dit adgangskode', 'password', '');

  // Add submit button
  const submitBtn = Button(
    'Log ind',
    'submit',
    'w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors font-medium'
  );

  form.append(username, password, submitBtn);
  container.append(form);

  return container;
};
