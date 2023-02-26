import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer(
  {
    order: {},
    orders: [],
    isUpdated: false,
    isDeleted: false,
  },
  {
    createOrderRequest: (state, action) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllOrdersRequest: (state, action) => {
      state.loading = true;
    },
    getAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getAllOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    myOrdersRequest: (state, action) => {
      state.loading = true;
    },
    myOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderDetailsRequest: (state, action) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderRequest: (state, action) => {
      state.loading = true;
      state.isUpdated = false;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updateReset: (state, action) => {
      state.isUpdated = false;
    },
    deleteOrderRequest: (state, action) => {
      state.loading = true;
      state.isDeleted = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteOrderFail: (state, action) => {
      state.isDeleted = false;
      state.loading = false;
      state.error = action.payload;
    },
    getIncomeRequest: (state, action) => {
      state.loading = true;
    },
    getIncomeSuccess: (state, action) => {
      state.loading = false;
      state.income = action.payload;
    },
    getIncomeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.isDeleted = false;
      state.isUpdated = false;
    },
  }
);
