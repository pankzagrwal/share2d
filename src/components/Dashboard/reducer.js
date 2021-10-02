const prospects = (state = [], action) => {
  switch (action.type) {
    case "SET_LEAD_LIST_BUSINESS":
      return {
        ...state,
        business: action.payload,
      };
    case "SET_LEAD_LIST_PROMOTER":
      return {
        ...state,
        promoter: action.payload,
      };
    case "SET_COMMISSION_RECEIVE":
      return {
        ...state,
        commission: {
          ...state.commission,
          receive: action.payload,
        },
      };
    case "SET_COMMISSION_GIVE":
      return {
        ...state,
        commission: {
          ...state.commission,
          give: action.payload,
        },
      };
    default:
      return state;
  }
};

export default prospects;
