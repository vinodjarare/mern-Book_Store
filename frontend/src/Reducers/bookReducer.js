import { createReducer } from "@reduxjs/toolkit";

export const booksReducer = createReducer(
  {
    isDeleted: false,
    isUpdated: false,
    success: false,
  },
  {
    allBooksRequest: (state) => {
      state.loading = true;
    },
    allBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
      state.booksCount = action.booksCount;
      state.filteredbooksCount = action.filteredbooksCount;
      state.resultPerPage = action.resultPerPage;
    },
    allBooksFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    BookDetailRequest: (state) => {
      state.loading = true;
    },
    BookDetailSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload;
    },
    BookDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBookRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    createBookSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.book = action.payload;
    },
    createBookFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookRequest: (state) => {
      state.loading = true;
      state.isDeleted = false;
    },
    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.book = action.payload;
    },
    deleteBookFail: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.error = action.payload;
    },
    updateBookRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    updateBookSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.book = action.payload;
    },
    updateBookFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updateReset: (state, action) => {
      state.isUpdated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.isDeleted = false;
      state.message = null;
      state.success = false;
    },
  }
);
