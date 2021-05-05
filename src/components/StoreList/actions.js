import interceptor from '../../utils/interceptor.js';

export const getStores = (payload) => async (dispatch) => {
    const  {
        industry = ''
    } = payload;

    const stores = await interceptor({
            url: `/accounts/store?type=business&industries=${industry}`,
            method: 'GET',
        })
    const {
        data: {
            results,
            count
        } = {}
    } = stores
    const resultMap = results.reduce((acc, item) => {
        return {
            ...acc,
            [item.id]: item
        }
    }, {})

    const storeIds = Object.keys(resultMap).join(',')
    const {
        data: {
            results: offers = []
        } = {}
    } = await interceptor({
        url: `/offer/offer?business_ids=${storeIds}`,
        method: 'GET',
    })
    offers.forEach(offer => {
        if (!resultMap[offer.business].offer) {
             resultMap[offer.business].offer = offer
        }
    });
    dispatch({
        type: 'SET_STORES',
        payload: {
            results: Object.values(resultMap),
            count
        }
    })
}
