import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autoLogin, logout } from './redux/action/user.action'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignInUp from './page/signInUp'
import VerifyAccount from './page/verifyAccount'
import Home from './page/Home'
import DrawerTab from './component/drawer'
import Company from './page/Company'
import Career from './page/Career'
import './App.css'
import AuthRoute from './utils/AuthRoute'
import User from './page/User'
import ImageUploader from './component/ImageUploader'
import CompanyManagement from './page/CompanyManagement'

// useEffect(() => {

// }, [third])

function App() {
  const dispatch = useDispatch()

  const alreadyLogin = () => {
    if (window.localStorage.getItem('userToken')) {
      dispatch(autoLogin())
    }
  }

  useEffect(() => {
    alreadyLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Routes>
      <Route exact path="/" element={<AuthRoute loginRequired page={Home} />} />
      <Route exact path="/login" element={<SignInUp />} />
      <Route exact path="/login/verify-account" element={<VerifyAccount />} />
      <Route
        exact
        path="/company"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />

            <Company />
          </Box>
        )}
      />
      <Route
        exact
        path="/user"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />

            <User />
          </Box>
        )}
      />
      <Route
        exact
        path="/company"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />

            <Company />
          </Box>
        )}
      />
      <Route
        exact
        path="/upload"
        element={(
          <ImageUploader />
)}
      />
      <Route
        exact
        path="/career"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />

            <Career />
          </Box>
        )}
      />
      <Route
        exact
        path="/CompanyManagement"
        element={(
          <CompanyManagement />
)}
      />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
