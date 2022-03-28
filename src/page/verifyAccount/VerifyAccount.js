import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import queryString from 'query-string'
import { makeStyles } from '@mui/styles'

import CircularProgress from '@mui/material/CircularProgress'
import Lottie from 'lottie-react-web'
import { Typography } from '@mui/material'
import Proptypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import verify from './Verify.json'
import emailSent from './emailSent.json'

const useStyles = makeStyles({
  container: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
})

function VerifyAccount(props) {
  const classes = useStyles()
  const [showVerification, setShowVerification] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const queryParams = queryString.parse(window.location.search)
  const location = useLocation()
  const pathName = _get(location, 'pathname')
  const searchQuery = _get(location, 'search')
  const sendVerify = async () => {
    setLoading(true)
    const body = {
      verificationToken: queryParams.token,
      email: queryParams.email,
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/verify-email`, body)
      if (response.status === 200 || response.status === 201) {
        setShowVerification(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (pathName === '/login/verify-account' && !_isEmpty(searchQuery)) {
      sendVerify()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box className={classes.container}>
      {pathName === '/login/verify-account'
        && _isEmpty(searchQuery) && (
          <Box display="flex" flexDirection="column">
            <Lottie options={{ animationData: emailSent, loop: false }} />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">Success</Typography>
              <Typography>Please check your email to verify account</Typography>
            </Box>
          </Box>
      )}
      {(pathName === '/login/verify-account'
        && !_isEmpty(searchQuery) && showVerification && !loading) && (
          <Box display="flex" flexDirection="column">
            <Box width={200}>
              <Lottie options={{ animationData: verify, loop: true }} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">Verify Complete</Typography>
              <Box mt={2}>
                <Button color="primary" variant="contained" onClick={() => history('/login')}>Back to login page </Button>

              </Box>
            </Box>
          </Box>
      )}
      {
        loading && (
          <CircularProgress color="primary" size={40} />
        )
      }
    </Box>
  )
}
export default VerifyAccount

VerifyAccount.propTypes = {
  computedMatch: Proptypes.shape({}),
}
VerifyAccount.defaultProps = {
  computedMatch: {},
}
