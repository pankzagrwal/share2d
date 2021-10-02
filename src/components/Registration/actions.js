import interceptor from "../../utils/interceptor.js";

export const postRegistration = (payload) => async (dispatch) => {
  let login;
  try {
    const { name, mobileNumber, password, shopAddress, shopName } = payload;
    const data = {
      username: mobileNumber,
      phone: mobileNumber,
      password,
      store_name: shopName,
      name,
      address: shopAddress,
    };
    const { status } = await interceptor({
      url: "/accounts/registration",
      method: "POST",
      apiName: "signup",
      body: data,
    });
    if (status === 201) {
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
    }
    return login;
  } catch {
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "error",
        message: "Registration  Failed",
      },
    });
  }
};
