import interceptor from '../../utils/interceptor.js';


export const dropLead = (payload) => async (dispatch) => {
     return await interceptor({
            url: `/lead/lead`,
            method: 'post',
            body: payload
        })

}