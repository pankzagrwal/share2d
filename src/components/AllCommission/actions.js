import interceptor from "../../utils/interceptor.js";

export const getTransactions = (id) => async (dispatch) => {
  const { data } = await interceptor({
    url: `/payments/transaction?ledger_ids=${id}&types=1&settled=false`,
  });

  dispatch({
    type: "SET_TRANSACTION_MERCHANT",
    payload: data?.results ?? [],
  });
};

export const getSettledTransaction = (id) => async (dispatch) => {
  const { data } = await interceptor({
    url: `/payments/transaction?ledger_ids=${id}&types=2`,
  });

  dispatch({
    type: "SET_TRANSACTION_MERCHANT",
    payload: data?.results ?? [],
  });
};
