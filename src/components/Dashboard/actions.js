import interceptor from '../../utils/interceptor.js';

export const getLead = (payload) => async (dispatch) => {
    const  {
        type
    } = payload;
    await interceptor({
        url: `/lead/lead?as=${type}`,
        method: 'GET',
    })
}