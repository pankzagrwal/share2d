import interceptor from '../../utils/interceptor.js';

export const postRegistration = (payload) => async (dispatch) => {
    return interceptor({
        url: 'api/accounts/registration',
        method: 'POST',
        body: payload
    }).then(res => {
        console.log(res)
    }).catch(err => {
        const sessionID = 'abcdef';
        localStorage.removeItem('tokenId');
        localStorage.setItem('tokenId', sessionID);
        return sessionID;
    })
}
