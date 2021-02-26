import interceptor from '../../utils/interceptor.js';

export const postRegistration = (payload) => async (dispatch) => {
    const  {
        name,
        mobileNumber,
        password,
        shopAddress,
        shopName
    } = payload;
    const data = {
        username: mobileNumber,
        phone: mobileNumber,
        password,
        store_name: shopName,
        name,
        address: shopAddress
    }
    let login;
    const { status } = await interceptor({
        url: '/accounts/registration',
        method: 'POST',
        body: data
    })
    if (status === 201) {
        login = await interceptor({
            url: '/accounts/session',
            method: 'POST',
            apiName: 'login',
            body: {
                username: mobileNumber,
                password
            }
        })
    }
    return login;
}
