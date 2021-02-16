export const config = (state = [], action) => {
 switch (action.type) {
  case 'SET_INDUSTRIES':
   return {
    ...state,
    industries: action.payload
   }
  default:
   return state
 }
}

export const user = (state = {}, action) => {
     switch (action.type) {
        case 'SET_USER_DETAILS':
        return {
            ...state,
            ...action.payload
        };
        case 'SET_REGISTRATION_STATUS':
            return {
                ...state,
                registration: true
            }
        default:
        return state
    }
}

