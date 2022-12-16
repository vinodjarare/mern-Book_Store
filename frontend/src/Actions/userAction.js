import axios from "axios";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "registerUserRequest",
      });
      const config = `application/json`;
      const { data } = await axios.post(
        `/api/v1/auth/register`,
        { name, email, password },
        config
      );

      dispatch({
        type: "registerUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "registerUserFail",
        payload: error.response.data.message,
      });
    }
  };
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "loginUserRequest",
      });
      const config = `application/json`;
      const { data } = await axios.post(
        `/api/v1/auth/login`,
        { email, password },
        config
      );

      dispatch({
        type: "loginUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "loginUserFail",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`/api/v1/auth/me`);

    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    const { data } = await axios.post(`/api/v1/auth/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserRequest",
    });
    const { data } = await axios.delete(`/api/v1/auth/user/${id}`);
    dispatch({
      type: "deleteUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response.data.error,
    });
  }
};
export const updateUser = (id, isAdmin) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserRequest",
    });
    const { data } = await axios.put(`/api/v1/auth/user/${id}`, isAdmin);
    dispatch({
      type: "updateUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateUserFail",
      payload: error.response.data.error,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });
    const { data } = await axios.get(`/api/v1/auth/users/`);
    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFail",
      payload: error.response.data.error,
    });
  }
};
