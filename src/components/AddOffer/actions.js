import interceptor from '../../utils/interceptor.js';

export const saveOffer = (payload) => async (dispatch) => {
    const url = payload.id ? `/offer/offer${`/${payload.id}`}` : '/offer/offer';
    const method = payload.id ? 'patch' : 'post'
    return await interceptor({
        url,
        method,
        body: payload
    })
}
