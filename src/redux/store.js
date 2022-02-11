import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import alertReducer from './reducer/alert.reducer'

const reducers = combineReducers({
  alertReducer,
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default store
