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
    const {data} = await interceptor({
        url: `/accounts/store/${payload.id}`,
        method: 'patch',
        body: payload
    })
    dispatch({
        type: 'SET_STORE',
        payload: data ?? {}
    })
}
