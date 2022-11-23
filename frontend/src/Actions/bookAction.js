import axios from "axios";
export const fetchallbooks = () => async (dispatch) => {
  try {
    dispatch({
      type: "allBooksRequest",
    });

    const { data } = await axios.get(`/api/v1/books`);

    dispatch({
      type: "allBooksSuccess",
      payload: data.books,
    });
  } catch (error) {
    dispatch({
      type: "allBooksFail",
      payload: error.response.data.message,
    });
  }
};
export const fetchaBookDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "BookDetailRequest",
    });

    const { data } = await axios.get(`/api/v1/books/${id}`);

    dispatch({
      type: "BookDetailSuccess",
      payload: data.book,
    });
  } catch (error) {
    dispatch({
      type: "BookDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const createBook =
  ({ name, auther, price, stock, categary, description, image }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "createBookRequest",
      });
      const config = "application/json  ";
      const { data } = await axios.post(
        "/api/v1/books",
        { name, auther, price, stock, categary, description, image },
        config
      );
      dispatch({
        type: "createBookSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "createBookFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBookRequest",
    });
    const { data } = await axios.delete(`/api/v1/books/${id}`);

    dispatch({
      type: "deleteBookSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteBookFail",
      payload: error.response.data.message,
    });
  }
};
