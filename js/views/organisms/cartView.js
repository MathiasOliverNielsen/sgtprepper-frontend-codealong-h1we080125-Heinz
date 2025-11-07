/**
 * Cart View Components - Handles cart UI display and interactions
 * Creates reusable view components following atomic design principles
 */

import { Div, Button, Heading, Paragraph, Image, Fragment } from '../atoms/index.js';
import { price2Dkk } from '../../utils/index.js';

/**
 * Main Cart View - Full cart page display
 * @param {Array} cartItems - Array of cart items
 * @param {Object} cartSummary - Cart totals and summary
 * @param {Function} onUpdateQuantity - Callback for quantity changes
 * @param {Function} onRemoveItem - Callback for item removal
 */
export const CartView = (cartItems, cartSummary, onUpdateQuantity, onRemoveItem) => {
  const container = Fragment();

  // Cart header
  const header = Div('mb-8');
  const title = Heading('Din Indkøbskurv', 1, 'text-3xl font-bold text-gray-800 mb-2');
  const itemCount = Paragraph('text-gray-600');
  itemCount.innerText = `${cartSummary.totalItems} vare${cartSummary.totalItems !== 1 ? 'r' : ''} i kurven`;
  header.append(title, itemCount);
  container.append(header);

  if (cartSummary.isEmpty) {
    // Empty cart state
    const emptyState = EmptyCartView();
    container.append(emptyState);
  } else {
    // Cart items list
    const cartContent = Div('grid gap-6 lg:grid-cols-3');

    // Cart items (left side)
    const itemsSection = Div('lg:col-span-2');
    const itemsContainer = Div('space-y-4');

    cartItems.forEach((item) => {
      const itemView = CartItemView(item, onUpdateQuantity, onRemoveItem);
      itemsContainer.append(itemView);
    });

    itemsSection.append(itemsContainer);
    cartContent.append(itemsSection);

    // Cart summary (right side)
    const summarySection = Div('lg:col-span-1');
    const summary = CartSummaryView(cartSummary);
    summarySection.append(summary);
    cartContent.append(summarySection);

    container.append(cartContent);
  }

  return container;
};

/**
 * Individual Cart Item View
 * @param {Object} item - Cart item object
 * @param {Function} onUpdateQuantity - Quantity update callback
 * @param {Function} onRemoveItem - Remove item callback
 */
export const CartItemView = (item, onUpdateQuantity, onRemoveItem) => {
  const container = Div('bg-white border border-gray-200 rounded-lg p-4 shadow-sm');

  const itemContent = Div('flex gap-4');

  // Product image
  const imageContainer = Div('flex-shrink-0');
  const image = Image(`http://localhost:4000${item.imageUrl}`, item.name, 'w-20 h-20 object-cover rounded-md');
  imageContainer.append(image);
  itemContent.append(imageContainer);

  // Product info
  const infoContainer = Div('flex-1 min-w-0');
  const productName = Heading(item.name, 3, 'text-lg font-semibold text-gray-800 mb-1');
  const productPrice = Paragraph('text-gray-600 text-sm mb-2');
  productPrice.innerText = `Pris: ${price2Dkk(item.price)}`;

  // Quantity controls
  const quantityContainer = Div('flex items-center gap-2 mb-2');
  const quantityLabel = Paragraph('text-sm text-gray-600 mr-2');
  quantityLabel.innerText = 'Antal:';

  const decreaseBtn = Button('-', 'button', 'w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-bold');
  decreaseBtn.onclick = () => onUpdateQuantity(item.id, item.quantity - 1);

  const quantityDisplay = Div('w-12 text-center font-semibold text-gray-800');
  quantityDisplay.innerText = item.quantity;

  const increaseBtn = Button('+', 'button', 'w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-bold');
  increaseBtn.onclick = () => onUpdateQuantity(item.id, item.quantity + 1);

  quantityContainer.append(quantityLabel, decreaseBtn, quantityDisplay, increaseBtn);

  infoContainer.append(productName, productPrice, quantityContainer);
  itemContent.append(infoContainer);

  // Item total and remove button
  const actionsContainer = Div('text-right flex-shrink-0');
  const subtotal = Paragraph('text-lg font-bold text-gray-800 mb-2');
  subtotal.innerText = price2Dkk(item.subtotal);

  const removeBtn = Button('Fjern', 'button', 'text-red-600 hover:text-red-800 text-sm underline');
  removeBtn.onclick = () => onRemoveItem(item.id);

  actionsContainer.append(subtotal, removeBtn);
  itemContent.append(actionsContainer);

  container.append(itemContent);
  return container;
};

/**
 * Cart Summary View - Shows totals and checkout button
 * @param {Object} summary - Cart summary object
 */
export const CartSummaryView = (summary) => {
  const container = Div('bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4');

  const title = Heading('Oversigt', 2, 'text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2');
  container.append(title);

  // Summary details
  const details = Div('space-y-3 mb-6');

  const itemsRow = Div('flex justify-between text-gray-600');
  const itemsLabel = Paragraph();
  itemsLabel.innerText = `Antal varer:`;
  const itemsValue = Paragraph();
  itemsValue.innerText = `${summary.totalItems}`;
  itemsRow.append(itemsLabel, itemsValue);
  details.append(itemsRow);

  // Total price
  const totalRow = Div('flex justify-between text-lg font-bold text-gray-800 border-t border-gray-300 pt-3');
  const totalLabel = Paragraph();
  totalLabel.innerText = 'Total:';
  const totalValue = Paragraph();
  totalValue.innerText = price2Dkk(summary.totalPrice);
  totalRow.append(totalLabel, totalValue);
  details.append(totalRow);

  container.append(details);

  // Checkout button
  const checkoutBtn = Button('Gå til betaling', 'button', 'w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-semibold transition-colors');
  checkoutBtn.onclick = () => {
    alert('Checkout funktionalitet kommer snart!');
  };

  container.append(checkoutBtn);

  // Continue shopping link
  const continueContainer = Div('text-center mt-4');
  const continueLink = Button('← Fortsæt med at handle', 'button', 'text-blue-600 hover:text-blue-800 underline');
  continueLink.onclick = () => {
    window.location.hash = '#/';
  };
  continueContainer.append(continueLink);
  container.append(continueContainer);

  return container;
};

/**
 * Empty Cart View - Shown when cart has no items
 */
export const EmptyCartView = () => {
  const container = Div('text-center py-12');

  // Cart icon
  const icon = Div('text-6xl text-gray-300 mb-4');
  icon.innerHTML = '🛒';
  container.append(icon);

  const title = Heading('Din indkøbskurv er tom', 2, 'text-2xl font-semibold text-gray-700 mb-4');
  container.append(title);

  const message = Paragraph('text-gray-600 mb-8');
  message.innerText = 'Tilføj nogle produkter til din kurv for at komme i gang';
  container.append(message);

  const shopBtn = Button('Start med at handle', 'button', 'bg-sky-600 hover:bg-sky-700 text-white py-3 px-6 rounded-md font-semibold transition-colors');
  shopBtn.onclick = () => {
    window.location.hash = '#/';
  };
  container.append(shopBtn);

  return container;
};

/**
 * Mini Cart View - For header/dropdown display
 * @param {Array} cartItems - Cart items (limited)
 * @param {Object} summary - Cart summary
 */
export const MiniCartView = (cartItems, summary) => {
  const container = Div('bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80');

  const header = Div('flex justify-between items-center mb-3 border-b border-gray-200 pb-2');
  const title = Heading('Indkøbskurv', 3, 'text-lg font-semibold text-gray-800');
  const itemCount = Paragraph('text-sm text-gray-600');
  itemCount.innerText = `${summary.totalItems} vare${summary.totalItems !== 1 ? 'r' : ''}`;
  header.append(title, itemCount);
  container.append(header);

  if (summary.isEmpty) {
    const empty = Paragraph('text-gray-600 text-center py-4');
    empty.innerText = 'Din kurv er tom';
    container.append(empty);
  } else {
    // Show first 3 items
    const itemsList = Div('space-y-2 mb-4 max-h-48 overflow-y-auto');
    const displayItems = cartItems.slice(0, 3);

    displayItems.forEach((item) => {
      const miniItem = Div('flex gap-2 items-center text-sm');
      const name = Paragraph('flex-1 text-gray-800 font-medium truncate');
      name.innerText = item.name;
      const quantity = Paragraph('text-gray-600');
      quantity.innerText = `${item.quantity}x`;
      const price = Paragraph('text-gray-800 font-semibold');
      price.innerText = price2Dkk(item.subtotal);
      miniItem.append(name, quantity, price);
      itemsList.append(miniItem);
    });

    if (cartItems.length > 3) {
      const more = Paragraph('text-xs text-gray-500 text-center');
      more.innerText = `+${cartItems.length - 3} flere varer`;
      itemsList.append(more);
    }

    container.append(itemsList);

    // Total and action buttons
    const footer = Div('border-t border-gray-200 pt-3');
    const total = Div('flex justify-between items-center mb-3');
    const totalLabel = Paragraph('font-semibold text-gray-800');
    totalLabel.innerText = 'Total:';
    const totalValue = Paragraph('font-bold text-gray-800');
    totalValue.innerText = price2Dkk(summary.totalPrice);
    total.append(totalLabel, totalValue);
    footer.append(total);

    const viewCartBtn = Button('Se kurv', 'button', 'w-full bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition-colors');
    viewCartBtn.onclick = () => {
      window.location.hash = '#/cart';
    };
    footer.append(viewCartBtn);
    container.append(footer);
  }

  return container;
};
