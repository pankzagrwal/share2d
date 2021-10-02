import interceptor from "../../utils/interceptor.js";

export const getTransactions = () => async (dispatch) => {
  try {
    const { data } = await interceptor({
      url: "/payments/ledger",
    });
    const secondParty = [
      ...new Set(data?.results.map((item) => item.to_id) || []),
    ];

    let {
      data: { results: otherStore },
    } = await interceptor({
      url: `/accounts/store?ids=${secondParty.join(",")}`,
    });

    otherStore = otherStore.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: item,
      };
    }, {});

    dispatch({
      type: "SET_TRANSACTION",
      payload: data?.results ?? [],
    });
    dispatch({
      type: "SET_OTHER_STORES",
      payload: otherStore || [],
    });
  } catch {
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "error",
        message: "Some Error Occured, Try Again",
      },
    });
  }
};

export const settleTransaction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADER",
      payload: true,
    });
    await interceptor({
      url: `/payments/ledger/${id}/settle`,
      method: "POST",
    });
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "success",
        message: "Settled !!",
      },
    });
    getTransactions();
    dispatch({
      type: "SET_LOADER",
      payload: false,
    });
  } catch {
    dispatch({
      type: "SET_LOADER",
      payload: false,
    });
    dispatch({
      type: "SET_ALERT",
      payload: {
        isOpen: true,
        severity: "error",
        message: "Some Error Occured, Try Again",
      },
    });
  }
};
