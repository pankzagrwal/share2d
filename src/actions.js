import interceptor from './utils/interceptor.js';


export const getProfile = (payload) => async (dispatch) => {
    const authToken = localStorage && localStorage.getItem('authToken');
    if (!authToken) {
        dispatch({
            type: 'SET_PROFILE',
            payload: {isLoaded: true}
        })
        return;
    }
     const {data} = await interceptor({
            url: `/accounts/session/${authToken}`,
            method: 'GET',
        })
    const profile = data?.profile;
    const id = profile?.id;
    const {data: offerData} = await interceptor({
        url: `/offer/offer?business_ids=${id}`
    })
    profile.offer = offerData?.results[0];
    dispatch({
        type: 'SET_PROFILE',
        payload: profile ?? {}
    })
    const result = await interceptor({
        url: '/accounts/industry'
    })
    const industries =  result?.data?.results

    dispatch({
        type: 'SET_INDUSTRIES',
        payload: industries
    })
}
