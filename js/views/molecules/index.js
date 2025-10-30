import { Heading, Label, Li, Link, Paragraph, Ul, Div, Input } from '../atoms/index.js'; // Add Div and Input

export const HeaderView = () => {
  const element = document.createElement('header');
  element.className = 'bg-slate-700 p-4 text-white flex justify-between items-center';

  const h1 = Heading('Sgt. Prepper');
  h1.className = 'text-2xl font-bold';

  const nav = document.createElement('nav');
  nav.className = 'flex items-center';

  const a = Link('#/login', 'Login', 'bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2'); // Use hash routing for SPA

  // Add a login icon
  a.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
    </svg>
    Login
  `;

  nav.append(a);
  element.append(h1, nav);
  return element;
};

export const NavBarView = (arrNavItems, activeCategory = null) => {
  const element = document.createElement('nav');
  element.className = 'bg-sky-950';
  const ul = Ul('flex');

  arrNavItems.forEach((item) => {
    const { url, title, slug } = item; // Destructure assignment - udskiller egenskaber fra objekt

    const li = Li();

    // Check if this is the active category
    const isActive = activeCategory === slug;
    const linkClass = isActive ? 'block p-4 text-white bg-sky-600 border-b-2 border-white font-semibold' : 'block p-4 text-white hover:bg-sky-800 transition-colors';

    const item1 = Link(url, title, linkClass);
    li.append(item1);
    ul.append(li);
  });

  element.append(ul);
  return element;
};

export const MainView = (title, content) => {
  const element = document.createElement('main');
  element.className = 'p-4 min-h-60';
  const h1 = Heading(title);
  element.append(h1, content);
  return element;
};

export const FooterView = () => {
  const element = document.createElement('footer');
  element.className = 'h-[170px] p-4 bg-[url(./images/footer-bg.svg)] bg-center bg-no-repeat';
  return element;
};

export const FormGroup = (title, name, placeholder, type, value) => {
  const element = Div('mb-4');
  const label = Label(title, name, 'block text-sm font-medium text-gray-700 mb-2');
  const input = Input(
    name,
    placeholder,
    type,
    value,
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors'
  );
  element.append(label, input);
  return element;
};
