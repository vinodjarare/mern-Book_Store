import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "createOrderRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: "createOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};
