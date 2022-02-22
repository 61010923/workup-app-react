import { LOGOUT, LOADING, LOGIN_SUCCESS } from '../action/user.action'

const initialState = {
  isLogin: !!window.localStorage.getItem('userToken'),
  userDetail: {},
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
        userDetail: action.payload.userId,
        loading: false,
      }
    }
    case LOGOUT: {
      return {
        isLogin: false,
        userDetail: {},
        loading: false,
      }
    }
    default: return state
  }
}

export default userReducer
