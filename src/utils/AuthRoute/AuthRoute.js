import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import DrawerTab from '../../component/drawer'
import userDetail from '../../redux/selector/user.selector'
import showMessage from '../../redux/selector/alert.selector'
import Loading from '../../component/Loading'
import Snackbar from '../../component/Snackbar'

function AuthRoute(props) {
  const {
    page: Component,
    loginRequired: isLoginRequired,
    drawer,
  } = props
  const user = useSelector(userDetail)
  const snackbar = useSelector(showMessage)
  let output = ''
  if (user.loading) {
    output = <Loading />
  } else if (!user.isLogin && isLoginRequired) {
    output = <Navigate to="/login" />
  // eslint-disable-next-line brace-style
  }
  else if (user.isLogin && !isLoginRequired) {
    output = <Navigate to="/" />
  } else if ((user.isLogin && isLoginRequired) || (!user.isLogin && !isLoginRequired)) {
    output = (
      <>
        <Snackbar
          open={snackbar.open}
          timeduration={snackbar.time}
          message={snackbar.message}
          type={snackbar.type}
        />

        {drawer ? (
          <>
            <DrawerTab />
            <Box mt={8.1} ml={9.3}>
              <Box padding="2rem" sx={{ backgroundColor: '#F5F5F5' }}>
                <Paper sx={{ padding: '24px' }}>
                  <Component />
                </Paper>
              </Box>
            </Box>
          </>
        ) : (
          <Paper sx={{ padding: '16px' }}>
            <Component />
          </Paper>
        )}
      </>
    )
  }

  return output
}

export default AuthRoute

AuthRoute.propTypes = {
  page: PropTypes.elementType.isRequired,
  loginRequired: PropTypes.bool.isRequired,
  drawer: PropTypes.bool.isRequired,
}
