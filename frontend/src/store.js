import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "./Reducers/bookReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { userReducer } from "./Reducers/userReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    book: booksReducer,
    cart: cartReducer,
  },
});

export default store;
