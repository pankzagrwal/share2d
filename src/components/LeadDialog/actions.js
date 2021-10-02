import interceptor from "../../utils/interceptor.js";

export const dropLead = (payload) => async (dispatch) => {
  dispatch({
    type: "SET_LOADER",
    payload: true,
  });
  return await interceptor({
    url: `/lead/lead`,
    method: "post",
    body: payload,
  })
    .then(() => {
      dispatch({
        type: "SET_LOADER",
        payload: false,
      });
      dispatch({
        type: "SET_ALERT",
        payload: {
          isOpen: true,
          severity: "success",
          message: "Lead Sent",
        },
      });
      window.open(
        `https://wa.me/${payload?.customer?.phone}?text=hello ${payload?.customer?.name}, How are you`,
        "_blank"
      );
    })
    .catch(() => {
      dispatch({
        type: "SET_LOADER",
        payload: false,
      });
      dispatch({
        type: "SET_ALERT",
        payload: {
          isOpen: true,
          severity: "error",
          message: "Failed",
        },
      });
    });
};
