const stores = (state = [], action) => {
  switch (action.type) {
    case "SET_TRANSACTION":
      return {
        ...state,
        allMerchant: action.payload,
      };
    case "SET_TRANSACTION_MERCHANT":
      return {
        ...state,
        merchant: action.payload,
      };
    default:
      return state;
  }
};

export default stores;
