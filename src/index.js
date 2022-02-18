import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import App from './App'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </ThemeProvider>
    </React.StrictMode>

  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
