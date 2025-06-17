import { createSlice } from '@reduxjs/toolkit';

const getCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    return JSON.parse(savedCart);
  } else {
    return [];
  }
};

const getTotalItems = (items) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].quantity;
  }
  return total;
};

const getTotalPrice = (items) => {
  let totalPrice = 0;
  items.forEach(item => {
    totalPrice = totalPrice + (item.price * item.quantity);
  });
  return totalPrice;
};

const cartItems = getCartFromStorage();

const initialState = {
  items: cartItems,
  totalItems: getTotalItems(cartItems),
  totalPrice: getTotalPrice(cartItems)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      let found = false;
      
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === newProduct.id) {
          state.items[i].quantity = state.items[i].quantity + 1;
          found = true;
          break;
        }
      }
      
      if (!found) {
        state.items.push({ ...newProduct, quantity: 1 });
      }
      
      state.totalItems = getTotalItems(state.items);
      state.totalPrice = getTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      state.totalItems = getTotalItems(state.items);
      state.totalPrice = getTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action) => {
      const productId = action.payload.productId;
      const newQuantity = action.payload.quantity;
      
      if (newQuantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId);
      } else {
        const itemToUpdate = state.items.find(item => item.id === productId);
        if (itemToUpdate) {
          itemToUpdate.quantity = parseInt(newQuantity);
        }
      }
      
      state.totalItems = getTotalItems(state.items);
      state.totalPrice = getTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;