import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer(
  {
    order: {},
  },
  {
    createOrderRequest: (state, action) => {
      state.loading = false;
    },
    createOrderSuccess: (state, action) => {
      state.loading = true;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);
