import axios from "axios";

// Add to Cart
export const addItemsToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/books/${id}`);

  dispatch({
    type: "ADD_TO_CART",
    payload: {
      id: data.book._id,
      name: data.book.name,
      auther: data.book.auther,
      price: data.book.price,
      image: data.book.cover.url,
      stock: data.book.stock,
    },
  });
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART_ITEM",
    payload: id,
  });
};
export const decreasecart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "DECREASE_CART",
    payload: id,
  });
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "saveShippingInfo",
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
