import axios from 'axios'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOADING = 'LOADING'

function loginSuccess(userId) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      userId,
    },
  }
}
function loading() {
  return { type: LOADING }
}
export function checkLogin(userId) {
  return async (dispatch) => {
    dispatch(loading())
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/checklogin`, { userId })
      if (response.status === 200 || response.status === 201) {
        dispatch(loginSuccess(userId))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
