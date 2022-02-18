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
