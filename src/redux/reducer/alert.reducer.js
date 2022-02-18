import { CLEAR_MESSAGE, SHOW_MESSAGE } from '../action/alert.action'

const initialState = {
  snackBar: {
    open: false,
    type: '',
    time: '',
    message: '',
  },
}

// eslint-disable-next-line default-param-last
function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE: {
      return {
        ...state,
        snackBar: { ...action.payload },
      }
    }
    case CLEAR_MESSAGE: {
      return {
        open: false,
        type: '',
        time: '',
        message: '',
      }
    }
    default: return state
  }
}

export default alertReducer
