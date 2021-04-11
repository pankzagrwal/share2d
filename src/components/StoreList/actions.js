import interceptor from '../../utils/interceptor.js';

export const getStores = (payload) => async (dispatch) => {
    // const  {
    //     type
    // } = payload;
     await interceptor({
        url: `/accounts/store?type=business`,
        method: 'GET',
    })
}