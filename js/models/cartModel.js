const API_URL = 'http://localhost:4000/api';

export const getCart = async () => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // If you have auth
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    // Fallback to localStorage for demo
    return JSON.parse(localStorage.getItem('cart') || '{"items": [], "total": 0}');
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    // Fallback to localStorage for demo
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "total": 0}');
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: 0 }); // Price will be fetched
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    // Fallback to localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "total": 0}');
    const item = cart.items.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Fallback to localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "total": 0}');
    cart.items = cart.items.filter((item) => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
};
