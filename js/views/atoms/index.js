export const Fragment = () => {
  const element = document.createDocumentFragment();
  return element;
};

export const Div = (className = '') => {
  const element = document.createElement('div');
  element.className = className;
  return element;
};

export const Paragraph = (className = '') => {
  const element = document.createElement('p');
  element.className = className;
  return element;
};

export const Heading = (text, num = 1, className = '') => {
  const element = document.createElement(`h${num}`);
  element.className = className;
  element.textContent = text;
  return element;
};

export const Ul = (className = '') => {
  const element = document.createElement('ul');
  element.className = className;
  return element;
};

export const Li = (className = '') => {
  const element = document.createElement('li');
  element.className = className;
  return element;
};

export const Link = (to, text = '', className = '') => {
  const element = document.createElement('a');
  element.className = className;
  element.href = to;
  element.innerText = text;
  return element;
};

export const Image = (src, title, className = '') => {
  const element = document.createElement('img');
  element.src = src;
  element.className = className;
  element.alt = title;
  element.title = title;
  return element;
};

export const Form = (method = 'GET') => {
  const element = document.createElement('form');
  element.method = method;
  return element;
};

export const Label = (title, id, className = '') => {
  const element = document.createElement('label');
  element.htmlFor = id; // Fix: was 'elelment.for'
  element.innerText = title;
  element.className = className;
  return element; // Add return statement
};

export const Input = (name, placeholder, type = 'text', value = '', className = '') => {
  // Fix parameter name
  const element = document.createElement('input');
  element.type = type;
  element.name = name;
  element.placeholder = placeholder;
  element.value = value;
  element.className = className;
  element.autocomplete = true;
  element.required = true; // Make input required by default
  return element;
};

export const Button = (title, type = 'submit', className = '') => {
  const element = document.createElement('button');
  element.type = type;
  element.textContent = title; // Fix: was 'textContent'
  element.className = className;
  return element;
};
