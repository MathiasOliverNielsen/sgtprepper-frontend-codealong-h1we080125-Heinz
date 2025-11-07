/**
 * Cart Controller - Coordinates cart operations between model and view
 * Handles all cart-related business logic and user interactions
 */

import { cartModel } from '../models/cartModel.js';
import { CartView } from '../views/organisms/cartView.js';
import { Layout } from './layoutController.js';
import { showDeleteConfirm } from '../views/molecules/deleteModal.js';

/**
 * Main Cart Page Controller
 * Renders the full cart page with all items and functionality
 */
export const CartPage = () => {
  // Get cart data from model
  const cartItems = cartModel.getItems();
  const cartSummary = cartModel.getCartSummary();

  /**
   * Handle quantity updates
   * @param {string|number} itemId - Product ID
   * @param {number} newQuantity - New quantity value
   */
  const handleUpdateQuantity = (itemId, newQuantity) => {
    try {
      const success = cartModel.updateQuantity(itemId, newQuantity);

      if (success) {
        // Trigger cart update events
        dispatchCartUpdateEvent();

        // Refresh the current page to show updated totals
        window.location.reload();
      } else {
        console.error('Failed to update item quantity');
        alert('Kunne ikke opdatere antal. Prøv igen.');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Der opstod en fejl ved opdatering af antal.');
    }
  };

  /**
   * Handle item removal with custom modal
   * @param {string|number} itemId - Product ID to remove
   */
  const handleRemoveItem = async (itemId) => {
    try {
      const item = cartModel.getItem(itemId);
      const itemName = item ? item.name : 'Produktet';

      // Show custom delete confirmation
      const confirmed = await showDeleteConfirm(itemName);

      if (confirmed) {
        const success = cartModel.removeItem(itemId);

        if (success) {
          // Trigger cart update events
          dispatchCartUpdateEvent();

          // Refresh the page to show updated cart
          window.location.reload();
        } else {
          console.error('Failed to remove item');
          showErrorMessage('Kunne ikke fjerne produktet. Prøv igen.');
        }
      }
    } catch (error) {
      console.error('Error removing item:', error);
      showErrorMessage('Der opstod en fejl ved fjernelse af produktet.');
    }
  };

  // Create cart view with event handlers
  const cartView = CartView(cartItems, cartSummary, handleUpdateQuantity, handleRemoveItem);

  // Return layout with cart content
  return Layout('Indkøbskurv', cartView);
};

/**
 * Add Product to Cart
 * Can be called from product pages/lists
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity to add (default: 1)
 */
export const addToCart = (product, quantity = 1) => {
  try {
    // Validate product data
    if (!product || !product.id || !product.name || product.price === undefined) {
      throw new Error('Invalid product data');
    }

    // Add to cart via model
    const updatedCart = cartModel.addItem(product, quantity);

    // Dispatch custom event for other components to listen
    dispatchCartUpdateEvent();

    // Show success feedback
    showCartFeedback(`"${product.name}" blev tilføjet til kurven`, 'success');

    return updatedCart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    showCartFeedback('Kunne ikke tilføje produktet til kurven', 'error');
    throw error;
  }
};

/**
 * Remove Product from Cart
 * @param {string|number} itemId - Product ID
 */
export const removeFromCart = (itemId) => {
  try {
    const item = cartModel.getItem(itemId);
    const success = cartModel.removeItem(itemId);

    if (success) {
      dispatchCartUpdateEvent();
      const itemName = item ? item.name : 'Produktet';
      showCartFeedback(`"${itemName}" blev fjernet fra kurven`, 'success');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing from cart:', error);
    showCartFeedback('Kunne ikke fjerne produktet', 'error');
    return false;
  }
};

/**
 * Update Cart Item Quantity
 * @param {string|number} itemId - Product ID
 * @param {number} quantity - New quantity
 */
export const updateCartQuantity = (itemId, quantity) => {
  try {
    const success = cartModel.updateQuantity(itemId, quantity);

    if (success) {
      dispatchCartUpdateEvent();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return false;
  }
};

/**
 * Get Cart Summary for Header/Badge Display
 */
export const getCartSummary = () => {
  return cartModel.getCartSummary();
};

/**
 * Get Cart Items for Display
 */
export const getCartItems = () => {
  return cartModel.getItems();
};

/**
 * Clear Entire Cart with custom confirmation
 */
export const clearCart = async () => {
  try {
    const confirmed = await showDeleteConfirm('hele kurven');

    if (confirmed) {
      cartModel.clearCart();
      dispatchCartUpdateEvent();
      showCartFeedback('Kurven blev tømt', 'success');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error clearing cart:', error);
    showErrorMessage('Kunne ikke tømme kurven');
    return false;
  }
};

/**
 * Check if Product is in Cart
 * @param {string|number} productId - Product ID
 */
export const isInCart = (productId) => {
  return cartModel.isInCart(productId);
};

/**
 * Get Product Quantity in Cart
 * @param {string|number} productId - Product ID
 */
export const getCartQuantity = (productId) => {
  return cartModel.getItemQuantity(productId);
};

/**
 * Dispatch cart update event for other components
 * This allows header cart badge, etc. to update automatically
 */
const dispatchCartUpdateEvent = () => {
  const cartSummary = cartModel.getCartSummary();
  const event = new CustomEvent('cartUpdated', {
    detail: {
      summary: cartSummary,
      items: cartModel.getItems(),
      timestamp: new Date().toISOString(),
    },
  });
  window.dispatchEvent(event);
};

/**
 * Show simple error message
 * @param {string} message - Error message to display
 */
const showErrorMessage = (message) => {
  showCartFeedback(message, 'error');
};

/**
 * Show user feedback for cart actions
 * @param {string} message - Feedback message
 * @param {string} type - 'success', 'error', 'info'
 */
const showCartFeedback = (message, type = 'info') => {
  // Create temporary notification
  const notification = document.createElement('div');
  notification.className = `
    fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300
    ${type === 'success' ? 'bg-green-500 text-white' : ''}
    ${type === 'error' ? 'bg-red-500 text-white' : ''}
    ${type === 'info' ? 'bg-blue-500 text-white' : ''}
  `;
  notification.innerText = message;

  document.body.appendChild(notification);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
};

/**
 * Initialize cart-related event listeners
 * Call this when the app starts
 */
export const initializeCartListeners = () => {
  // Listen for cart updates to refresh UI elements
  window.addEventListener('cartUpdated', (event) => {
    const { summary } = event.detail;

    // Update cart badge in header if it exists
    const cartBadge = document.querySelector('[data-cart-badge]');
    if (cartBadge) {
      cartBadge.innerText = summary.totalItems;
      cartBadge.style.display = summary.totalItems > 0 ? 'inline' : 'none';
    }

    // Update any cart counters
    const cartCounters = document.querySelectorAll('[data-cart-count]');
    cartCounters.forEach((counter) => {
      counter.innerText = summary.totalItems;
    });
  });

  // Initialize cart badge on page load
  const initialSummary = getCartSummary();
  const cartBadge = document.querySelector('[data-cart-badge]');
  if (cartBadge) {
    cartBadge.innerText = initialSummary.totalItems;
    cartBadge.style.display = initialSummary.totalItems > 0 ? 'inline' : 'none';
  }
};
