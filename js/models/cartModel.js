/**
 * Cart Model - Handles all cart data operations and state management
 * Follows clean separation of concerns with localStorage persistence
 */

export class CartModel {
  constructor() {
    this.storageKey = 'sgtprepper_cart';
    this.cart = this.loadCart();
  }

  /**
   * Load cart from localStorage or initialize empty cart
   */
  loadCart() {
    try {
      const savedCart = localStorage.getItem(this.storageKey);
      return savedCart
        ? JSON.parse(savedCart)
        : {
            items: [],
            totalItems: 0,
            totalPrice: 0,
            lastUpdated: new Date().toISOString(),
          };
    } catch (error) {
      console.error('Error loading cart:', error);
      return this.createEmptyCart();
    }
  }

  /**
   * Save cart to localStorage
   */
  saveCart() {
    try {
      this.cart.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  /**
   * Create empty cart structure
   */
  createEmptyCart() {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Add item to cart or update quantity if exists
   * @param {Object} product - Product object with id, name, price, etc.
   * @param {number} quantity - Quantity to add (default: 1)
   */
  addItem(product, quantity = 1) {
    const { id, name, price, imageUrl, slug, category } = product;

    // Validate required fields
    if (!id || !name || price === undefined) {
      throw new Error('Invalid product data - missing required fields');
    }

    const existingItemIndex = this.cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      this.cart.items[existingItemIndex].quantity += quantity;
      this.cart.items[existingItemIndex].subtotal = this.cart.items[existingItemIndex].quantity * this.cart.items[existingItemIndex].price;
    } else {
      // Add new item
      const newItem = {
        id,
        name,
        price: parseFloat(price),
        quantity,
        imageUrl: imageUrl || '',
        slug: slug || '',
        category: category || '',
        subtotal: parseFloat(price) * quantity,
        addedAt: new Date().toISOString(),
      };
      this.cart.items.push(newItem);
    }

    this.updateTotals();
    this.saveCart();
    return this.cart;
  }

  /**
   * Remove item from cart completely
   * @param {string|number} itemId - Product ID to remove
   */
  removeItem(itemId) {
    const initialLength = this.cart.items.length;
    this.cart.items = this.cart.items.filter((item) => item.id !== itemId);

    if (this.cart.items.length < initialLength) {
      this.updateTotals();
      this.saveCart();
      return true;
    }
    return false;
  }

  /**
   * Update item quantity
   * @param {string|number} itemId - Product ID
   * @param {number} quantity - New quantity (0 to remove)
   */
  updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    const item = this.cart.items.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      item.subtotal = item.price * quantity;
      this.updateTotals();
      this.saveCart();
      return true;
    }
    return false;
  }

  /**
   * Get specific item from cart
   * @param {string|number} itemId - Product ID
   */
  getItem(itemId) {
    return this.cart.items.find((item) => item.id === itemId);
  }

  /**
   * Get all cart items
   */
  getItems() {
    return this.cart.items;
  }

  /**
   * Get cart summary
   */
  getCartSummary() {
    return {
      totalItems: this.cart.totalItems,
      totalPrice: this.cart.totalPrice,
      itemCount: this.cart.items.length,
      isEmpty: this.cart.items.length === 0,
    };
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    this.cart = this.createEmptyCart();
    this.saveCart();
    return this.cart;
  }

  /**
   * Update cart totals (private method)
   */
  updateTotals() {
    this.cart.totalItems = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  /**
   * Check if product is in cart
   * @param {string|number} itemId - Product ID
   */
  isInCart(itemId) {
    return this.cart.items.some((item) => item.id === itemId);
  }

  /**
   * Get item quantity in cart
   * @param {string|number} itemId - Product ID
   */
  getItemQuantity(itemId) {
    const item = this.getItem(itemId);
    return item ? item.quantity : 0;
  }
}

// Export singleton instance for consistent state across app
export const cartModel = new CartModel();
