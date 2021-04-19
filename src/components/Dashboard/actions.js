import interceptor from '../../utils/interceptor.js';

export const getLead = (payload) => async (dispatch) => {
    const  {
        type
    } = payload;
    const {data} = await interceptor({
        url: `/lead/lead?as=${type}`,
        method: 'GET',
    })

    dispatch({
        type: `SET_LEAD_LIST_${type.toUpperCase()}`,
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
