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
        url: 'api/accounts/registration',
        method: 'POST',
        body: data
    })
    if (status === 201) {
        login = await interceptor({
            url: 'http://3.20.116.189/accounts/session',
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
