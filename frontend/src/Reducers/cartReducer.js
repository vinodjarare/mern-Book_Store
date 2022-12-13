import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {
        address: "",
        city: "",
        country: "",
        phoneNo: "",
        pinCode: "",
        state: "",
      },
};

export const cartReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action) => {
    const existingIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload.id
    );

    if (existingIndex >= 0) {
      state.cartItems[existingIndex] = {
        ...state.cartItems[existingIndex],
        quantity: state.cartItems[existingIndex].quantity + 1,
      };
    } else {
      let tempProductItem = { ...action.payload, quantity: 1 };
      state.cartItems.push(tempProductItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  REMOVE_CART_ITEM: (state, action) => {
    state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  DECREASE_CART: (state, action) => {
    const existingIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload
    );
    if (existingIndex >= 0) {
      state.cartItems[existingIndex] = {
        ...state.cartItems[existingIndex],
        quantity: state.cartItems[existingIndex].quantity - 1,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },

  saveShippingInfo: (state, action) => {
    state.shippingInfo = action.payload;
  },
});
