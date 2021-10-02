import interceptor from "../../utils/interceptor.js";

export const postLogin = (payload) => async (dispatch) => {
  const { mobileNumber, password } = payload;
  dispatch({
    type: "SET_LOADER",
    payload: true,
  });
  let login;
  try {
    login = await interceptor({
      url: "/accounts/session",
      method: "POST",
      apiName: "login",
      body: {
        username: mobileNumber,
        password,
      },
    });

    dispatch({
      type: "SET_PROFILE",
      payload: login?.data?.profile ?? {},
    });

    return login;
  } catch (err) {
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "error",
        message: "",
      },
    });
  } finally {
    dispatch({
      type: "SET_LOADER",
      payload: false,
    });
  }
};

export const getOTP = (payload) => async (dispatch) => {
  const { mobileNumber } = payload;
  let data;
  dispatch({
    type: "SET_LOADER",
    payload: true,
  });
  try {
    data = await interceptor({
      url: "/otp/otp",
      method: "POST",
      body: {
        requested_by: mobileNumber,
        source: "app:reset_password",
      },
    });
    return data;
  } catch (err) {
    const error = Object.values(err.data).join(",");
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "error",
        message: error,
      },
    });
    return err;
  } finally {
    dispatch({
      type: "SET_LOADER",
      payload: false,
    });
  }
};

export const reset = (payload) => async (dispatch) => {
  const { mobileNumber, password, otp } = payload;
  let data;
  dispatch({
    type: "SET_LOADER",
    payload: true,
  });
  try {
    data = await interceptor({
      url: "/accounts/user/reset_password",
      method: "POST",
      body: {
        username: mobileNumber,
        password,
        otp,
      },
    });
    return data;
  } catch (err) {
    const error = Object.values(err.data).join(",");
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "error",
        message: error,
      },
    });
  } finally {
    dispatch({
      type: "SET_LOADER",
      payload: false,
    });
  }
};
