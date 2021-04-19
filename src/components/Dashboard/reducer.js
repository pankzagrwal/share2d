const prospects = (state = [], action) => {
 switch (action.type) {
  case 'SET_LEAD_LIST_BUSSINESS':
   return {
    ...state,
    business: action.payload
   }
    case 'SET_LEAD_LIST_PROMOTER':
   return {
    ...state,
    promoter: action.payload
   }
  default:
   return state
 }
}

export default prospects;
