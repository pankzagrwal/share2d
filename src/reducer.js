export const config = (state = [], action) => {
 switch (action.type) {
  case 'SET_INDUSTRIES':
   return {
    ...state,
    industries: action.payload
   }
  case 'SET_ALERT':
    return {
        ...state,
        alert: action.payload
    }
    case 'SET_LOADER':
        return {
            ...state,
            loader: action.payload
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
        case 'SET_PROFILE':
            return {
                ...state,
                ...action.payload
            }
        case 'SET_STORE':
            return {
                ...state,
                    store: {
                        ...state?.store,
                        ...action.payload
                    }
            }
        default:
        return state
    }
}
       

