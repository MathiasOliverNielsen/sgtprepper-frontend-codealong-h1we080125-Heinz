import { Div, Fragment, Heading, Image, Paragraph, Link, Button } from '../atoms/index.js';
import { price2Dkk } from '../../utils/index.js';
import { addToCart, isInCart, getCartQuantity } from '../../controllers/cartController.js';

export const ProductListView = (products) => {
  const element = Fragment();

  products.forEach((product) => {
    const { imageUrl, name, price, slug, stockText, stockClass, teaser, category } = product;

    // Make entire product card clickable with a link
    const productLink = Link(`#/product/${category}/${slug}`, '', 'block border hover:shadow-lg transition-shadow cursor-pointer');

    const div = Div('flex justify-between p-4');
    const img = Image(`http://localhost:4000${imageUrl}`, name, 'max-w-[200px]');
    div.append(img);

    const info = Div('flex-1 px-4');
    const h2 = Heading(name, 2, 'text-lg font-semibold text-blue-600 hover:text-blue-800');
    const p = Paragraph('text-gray-600 mt-2');
    p.innerHTML = teaser;
    info.append(h2, p);
    div.append(info);

    const cost = Div('text-right');
    const priceElement = Div('text-xl font-bold text-gray-800');
    priceElement.innerText = price2Dkk(price);

    const stockElm = Div(stockClass + ' text-sm font-bold border px-2 py-1 rounded-md bg-gray-50');
    stockElm.innerHTML = `📦 ${stockText}`;

    // Add to Cart button
    const addToCartBtn = Button('Læg i kurv', 'button', 'mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition-colors');
    addToCartBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        addToCart(product, 1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };

    cost.append(priceElement, stockElm, addToCartBtn);
    div.append(cost);

    // Append div to link, then link to element
    productLink.append(div);
    element.append(productLink);
  });

  return element;
};

export const ProductDetailView = (product) => {
  const element = Fragment();

  const { imageUrl, name, formattedPrice, stockText, stockClass, teaser, description, brandTitle, categoryTitle } = product;

  // Main product container
  const container = Div('max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden');

  // Product header section
  const header = Div('md:flex');

  // Image section
  const imageSection = Div('md:w-1/2 p-6');
  const img = Image(`http://localhost:4000${imageUrl}`, name, 'w-full h-auto rounded-lg shadow-md');
  imageSection.append(img);

  // Info section
  const infoSection = Div('md:w-1/2 p-6');

  // Product title
  const title = Heading(name, 1, 'text-3xl font-bold text-gray-800 mb-4');
  infoSection.append(title);

  // Brand and category info
  const metaInfo = Div('mb-4');
  if (brandTitle) {
    const brand = Paragraph('text-sm text-gray-600');
    brand.innerHTML = `<strong>Mærke:</strong> ${brandTitle}`;
    metaInfo.append(brand);
  }
  if (categoryTitle) {
    const category = Paragraph('text-sm text-gray-600');
    category.innerHTML = `<strong>Kategori:</strong> ${categoryTitle}`;
    metaInfo.append(category);
  }
  infoSection.append(metaInfo);

  // Price section
  const priceSection = Div('mb-6');
  const price = Heading(formattedPrice, 2, 'text-2xl font-bold text-blue-600');

  // Enhanced stock display
  const stockContainer = Div('mt-3 p-3 border rounded-lg bg-gray-50');
  const stockLabel = Paragraph('text-sm font-medium text-gray-700 mb-1');
  stockLabel.innerText = 'Lagerstatus:';
  const stock = Div(stockClass + ' text-lg font-bold flex items-center gap-2');
  stock.innerHTML = `📦 ${stockText}`;
  stockContainer.append(stockLabel, stock);

  priceSection.append(price, stockContainer);

  // Add to Cart section
  const cartSection = Div('mt-6 p-4 border-2 border-sky-200 rounded-lg bg-sky-50');

  // Quantity selector
  const quantityContainer = Div('flex items-center gap-3 mb-4');
  const quantityLabel = Paragraph('text-sm font-medium text-gray-700');
  quantityLabel.innerText = 'Antal:';

  const quantityControls = Div('flex items-center gap-2');
  const decreaseBtn = Button('-', 'button', 'w-8 h-8 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md font-bold');
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.max = '99';
  quantityInput.value = '1';
  quantityInput.className = 'w-16 text-center border border-gray-300 rounded-md py-1';
  const increaseBtn = Button('+', 'button', 'w-8 h-8 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md font-bold');

  decreaseBtn.onclick = () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  };

  increaseBtn.onclick = () => {
    if (quantityInput.value < 99) {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    }
  };

  quantityControls.append(decreaseBtn, quantityInput, increaseBtn);
  quantityContainer.append(quantityLabel, quantityControls);
  cartSection.append(quantityContainer);

  // Add to Cart button
  const addToCartBtn = Button(
    '🛒 Læg i kurv',
    'button',
    'w-full bg-sky-600 hover:bg-sky-700 text-white py-3 px-6 rounded-md text-lg font-semibold transition-colors flex items-center justify-center gap-2'
  );
  addToCartBtn.onclick = () => {
    const quantity = parseInt(quantityInput.value) || 1;
    try {
      addToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  cartSection.append(addToCartBtn);

  // Show current cart quantity if item is already in cart
  const currentQuantity = getCartQuantity(product.id);
  if (currentQuantity > 0) {
    const cartInfo = Paragraph('text-sm text-sky-700 mt-2 text-center');
    cartInfo.innerHTML = `✓ ${currentQuantity} stk. i kurven`;
    cartSection.append(cartInfo);
  }

  infoSection.append(cartSection);

  priceSection.append(price, stockContainer);
  infoSection.append(priceSection);

  // Teaser
  if (teaser) {
    const teaserElement = Paragraph('text-lg text-gray-700 mb-4 italic');
    teaserElement.innerText = teaser;
    infoSection.append(teaserElement);
  }

  header.append(imageSection, infoSection);
  container.append(header);

  // Description section
  if (description) {
    const descSection = Div('p-6 border-t border-gray-200');
    const descTitle = Heading('Beskrivelse', 2, 'text-xl font-semibold text-gray-800 mb-4');
    const descContent = Div('prose max-w-none text-gray-700');
    descContent.innerHTML = description;
    descSection.append(descTitle, descContent);
    container.append(descSection);
  }

  // Back link section
  const backSection = Div('p-6 border-t border-gray-200');
  const backLink = Link('#/', '← Tilbage til produktliste', 'inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors');
  backSection.append(backLink);
  container.append(backSection);

  element.append(container);
  return element;
};
