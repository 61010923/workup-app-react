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
import CompanyProfile from './page/CompanyProfile'
import Home from './page/Home'
import DrawerTab from './component/drawer'
import Company from './page/Company'
import Career from './page/Career'
import './App.css'
import AuthRoute from './utils/AuthRoute'
import ManagePosition from './page/ManagePosition'
import CompanyManagement from './page/CompanyManagement'
import NotFound from './component/NotFound'
import InfoUser from './page/InfoUser'
import UserPersonal from './page/UserPersonal'
import UserAccount from './page/UserAccount'
import UserTable from './page/UserTable'

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
      <Route exact path="/" element={<AuthRoute loginRequired page={Home} drawer />} />
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
        path="/candidatePersonal"
        element={<AuthRoute loginRequired drawer page={UserPersonal} />}
      />
      <Route
        exact
        path="/candidateAccount"
        element={<AuthRoute loginRequired drawer page={UserAccount} />}
      />
      <Route
        exact
        path="/candidateTable"
        element={<AuthRoute loginRequired drawer page={UserTable} />}
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
        path="/managePosition"
        element={<AuthRoute loginRequired drawer page={ManagePosition} />}

      />
      <Route exact path="/companyPersonal" element={<AuthRoute loginRequired drawer page={CompanyProfile} />} />

      <Route
        exact
        path="/InfoUser"
        element={(
          <InfoUser />
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
          <AuthRoute page={CompanyManagement} loginRequired drawer={false} />
)}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
