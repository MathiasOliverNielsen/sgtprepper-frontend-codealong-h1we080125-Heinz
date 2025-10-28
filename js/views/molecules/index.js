import { Heading, Label, Li, Link, Paragraph, Ul, Div, Input } from '../atoms/index.js'; // Add Div and Input

export const HeaderView = () => {
  const element = document.createElement('header');
  element.className = 'bg-slate-700 p-4 text-white';
  const h1 = Heading('Sgt. Prepper');
  element.append(h1);
  const p = Paragraph();
  const a = Link('#/login', 'Login'); // Use hash routing for SPA
  // OR
  // const a = Link('/login', 'Login'); // If you have proper backend routing
  p.append(a);
  element.append(p);
  return element;
};

export const NavBarView = (arrNavItems) => {
  const element = document.createElement('nav');
  element.className = 'bg-sky-950';
  const ul = Ul('flex');

  arrNavItems.forEach((item) => {
    const { url, title } = item; // Destructure assignment - udskiller egenskaber fra objekt

    const li = Li();
    const item1 = Link(url, title, 'block p-4 text-white');
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
  const element = Div();
  const label = Label(title, name);
  const input = Input(name, placeholder, type, value);
  element.append(label, input);
  return element;
};

// export const FormGroup = {title, name, placeholder, value} => {
// const element = Div()
// const label = Label(title, name)
// const Input(name, placeholder, type, value)
// append
// }
