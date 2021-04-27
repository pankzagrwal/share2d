import interceptor from '../../utils/interceptor.js';

export const getLead = (payload) => async (dispatch) => {
    const  {
        type
    } = payload;
    const {data} = await interceptor({
        url: `/lead/lead?as=${type}&fetch_type=in_process`,
        method: 'GET',
    })

    dispatch({
        type: `SET_LEAD_LIST_${type.toUpperCase()}`,
        payload: data?.results
    })
}

export const getCommission = (payload) => async (dispatch) => {
    const  {
        types,
        firstParty,
        secondParty
    } = payload;

    let url = `/payments/transaction?types=${types}`;
    if (firstParty) {
        url = `${url}&first_party_ids=${firstParty}`
    }
    if (secondParty) {
        url = `${url}&second_party_ids=${secondParty}`
    }
    const {data} = await interceptor({
        url: url,
        method: 'GET',
    })
        dispatch({
        type: `SET_COMMISSION_${firstParty ? 'GIVE' : 'RECEIVE'}`,
        payload: data?.results
    })
}

export const updateLead = (payload) => async (dispatch) => {
    const {
        id,
        status,
        price,
        item_description
    } = payload
    await interceptor({
        url: `/lead/lead/${id}/sale`,
        method: 'post',
        body: {
            status,
            price,
            item_description
        }
    })
}
