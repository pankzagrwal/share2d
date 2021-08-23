import interceptor from '../../utils/interceptor.js';

export const saveOffer = (payload) => async (dispatch) => {
    const url = payload.id ? `/offer/offer${`/${payload.id}`}` : '/offer/offer';
    const method = payload.id ? 'patch' : 'post'
    const offer = await interceptor({
        url,
        method,
        body: payload
    })

    dispatch({
        type: 'UPDATE_OFFER',
        payload: offer?.data
    })

    return offer;
}
