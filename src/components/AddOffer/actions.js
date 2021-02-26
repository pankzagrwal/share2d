import interceptor from '../../utils/interceptor.js';

export const getIndustries = () => async (dispatch) => {
    const result = await interceptor({
        url: '/accounts/industry'
    })
    const industries =  result?.data?.data?.results.map(item => {
        return {
            name: item.name
        }
    })
    console.log({industries})
    dispatch({
        type: 'SET_INDUSTRIES',
        payload: industries
    })
}
