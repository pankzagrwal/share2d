import interceptor from '../../utils/interceptor.js';

export const getIndustries = () => async (dispatch) => {
    const result = await interceptor({
        url: '/accounts/industry'
    })
    const industries =  result?.data?.results

    dispatch({
        type: 'SET_INDUSTRIES',
        payload: industries
    })
}

export const saveProfile = (payload) => async (dispatch) => {
    dispatch({
        type: 'SET_LOADER',
        payload: true
    })
    const {data} = await interceptor({
        url: `/accounts/store/${payload.id}`,
        method: 'patch',
        body: payload
    })
    dispatch({
        type: 'SET_STORE',
        payload: data ?? {}
    })
    dispatch({
        type: 'SET_ALERT',
        payload: {
            isOpen: true,
            severity: 'success',
            message: 'Profile Saved'
        }
    })
    dispatch({
        type: 'SET_LOADER',
        payload: false
    })
}
