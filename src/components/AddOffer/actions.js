import interceptor from '../../utils/interceptor.js';

export const saveOffer = (payload) => async (dispatch) => {
    const url = payload.id ? `/offer/offer${`/${payload.id}`}` : '/offer/offer';
    const method = payload.id ? 'patch' : 'post'
    try {
    dispatch({
        type: 'SET_LOADER',
        payload: true
    })
    const offer = await interceptor({
        url,
        method,
        body: payload
    })

    dispatch({
        type: 'UPDATE_OFFER',
        payload: offer?.data
    })
    dispatch({
        type: 'SET_ALERT',
        payload: {
            isOpen: true,
            severity: 'success',
            message: 'Offer Updated'
        }
    })
    dispatch({
        type: 'SET_LOADER',
        payload: false
    })

    return offer;
    }
    catch {
    dispatch({
        type: 'SET_LOADER',
        payload: false
    })
                dispatch({
                type: 'SET_ALERT',
                payload: {
                    isOpen: true,
                    severity: 'error',
                    message: 'Offer Update  Failed'
                }
            })
    }
}
