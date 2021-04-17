import interceptor from '../../utils/interceptor.js';

export const postLogin = (payload) => async (dispatch) => {
    const {
        mobileNumber,
        password
    } = payload;
    let login;
        login = await interceptor({
            url: '/accounts/session',
            method: 'POST',
            apiName: 'login',
            body: {
                username: mobileNumber,
                password
            }
        })
    dispatch({
        type: 'SET_PROFILE',
        payload: login?.data?.profile ?? {}
    })
    return login;
}
