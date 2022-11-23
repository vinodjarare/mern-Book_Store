import { createReducer } from "@reduxjs/toolkit";

export const booksReducer = createReducer(
  {
    isDeleted: false,
  },
  {
    allBooksRequest: (state) => {
      state.loading = true;
    },
    allBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
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
    },
    createBookSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload;
    },
    createBookFail: (state, action) => {
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
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
