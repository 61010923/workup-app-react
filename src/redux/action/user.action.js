import axios from 'axios'
import _get from 'lodash/get'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOADING = 'LOADING'
export const LOGOUT = 'LOGOUT'

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
function userLogout() {
  return { type: LOGOUT }
}
export function checkLogin(userToken, userId) {
  return async (dispatch) => {
    dispatch(loading())
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/checklogin`,
        {
          headers: {
            authorization: userToken,
          },
        },
      )
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('userToken', _get(response, 'data.data.userToken'))
        dispatch(loginSuccess(_get(response, 'data.data')))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function logout(userToken, clearLocal = false) {
  return async (dispatch) => {
    if (!clearLocal) {
      try {
        const response = axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`,
          {
            headers: {
              authorization: userToken,
            },
          },
        )
        if (response.status === 200 || response.status === 201) {
          dispatch(userLogout())
        }
        localStorage.removeItem('userToken')
      } catch (error) {
        console.log(error)
      }
    } else {
      localStorage.clear()
    }
  }
}

export function autoLogin() {
  return (dispatch) => {
    const tokenDetail = localStorage.getItem('userToken')
    if (!tokenDetail) {
      logout('', true)
      return
    }
    dispatch(checkLogin(tokenDetail))
  }
}
