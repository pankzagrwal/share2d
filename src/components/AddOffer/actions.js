const industries = [{
    name: 'Industry One'
}, {
    name: 'Industry Two'
}];

export const getIndustries = (payload) => dispatch => {
    dispatch({
        type: 'SET_INDUSTRIES',
        payload: industries
    })
}