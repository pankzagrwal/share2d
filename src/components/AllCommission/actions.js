import interceptor from '../../utils/interceptor.js';

export const getTransactions = (id) => async (dispatch) => {
    const {data} = await interceptor({
        url: `/payments/transaction?ledger_ids=${id}`
    })


    dispatch({
        type: 'SET_TRANSACTION_MERCHANT',
        payload: data?.results ?? []
    })
}