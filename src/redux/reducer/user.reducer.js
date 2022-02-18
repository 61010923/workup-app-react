import { LOADING, LOGIN_SUCCESS } from '../action/user.action'

const initialState = {
  isLogin: false,
  userId: '',
  loading: false,
}

// eslint-disable-next-line default-param-last
function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        isLogin: true,
        userId: action.payload.userId,
        loading: false,
      }
    }
    default: return state
  }
}

export default userReducer
