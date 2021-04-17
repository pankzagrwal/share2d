const stores = (state = [], action) => {
 switch (action.type) {
  case 'SET_STORES':
   return {
    ...state,
    results: action.payload?.results,
    count: action.payload?.count
   }
  default:
   return state
 }
}

export default stores;