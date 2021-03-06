import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import axios from 'axios'
import _get from 'lodash/get'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import _debounce from 'lodash/debounce'
import { checkLogin } from '../redux/action/user.action'
import showMessage from '../redux/selector/alert.selector'

const useStyles = makeStyles({
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
    // backgroundColor: 'orange',

  },
})

function SignUp(props) {
  const classes = useStyles()
  const { type, getImg, setImg } = props
  const history = useNavigate()
  const dispatch = useDispatch()
  const snackbar = useSelector(showMessage)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [checkFormat, setCheckFormat] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState('company')

  axios.defaults.withCredentials = true

  const initialState = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setCompany('')
    setLoading(false)
    setCheckFormat(false)
  }
  const emailValidate = (e) => {
    const re = /\S+@\S+\.\S+/
    return re.test(e)
  }
  const checkEmail = (e) => {
    let errorMessage = ''
    if (loading && !emailValidate(email)) {
      errorMessage = 'Email is invalid'
    } if (loading && _isEmpty(email)) {
      errorMessage = 'please fill email'
    }
    return errorMessage
  }

  const handleChange = (e, setValue) => {
    const { value } = e.target
    setValue(value)
  }

  const showUser = useCallback((value) => {
    getImg(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkFormat])

  const handleEmail = (e) => {
    const { value } = e.target
    const emailTyping = emailValidate(value)
    setCheckFormat(false)
    setEmail(value)
    if (type === 'signIn' && emailTyping) {
      setCheckFormat(true)
      showUser(value)
    } if (type === 'signIn' && _isEmpty(value)) {
      setImg('')
    }
  }
  const handlePassword = (e) => {
    const { value } = e.target

    setPassword(value)
  }

  const handleLogin = async () => {
    setLoading(true)
    const body = {
      email, password,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        body,
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
        // { withCredentials: true },
      )
      if (response.status === 200 || response.status === 201) {
        dispatch(
          checkLogin(
            _get(response, 'data.user.userToken'),
          ),
        )
        history('/')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const handleSubmit = async () => {
    setLoading(true)
    const body = {
      email,
      password,
      role: userType,
    }
    if (userType === 'company') {
      body.companyName = company
    }
    if (userType === 'candidate') {
      body.firstName = firstName
      body.lastName = lastName
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, body)
      if (response.status === 201) {
        history('/login/verify-account')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    initialState()
  }, [userType, type])

  return (
    <Box>
      {type === 'signUp' && (
        <Box className={classes.flexBox}>
          <Button
            variant="contained"
            sx={{ borderRadius: '8px 0 0 8px' }}
            color={userType === 'company' ? 'primary' : 'common'}
            onClick={() => setUserType('company')}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <BusinessIcon />
              <Typography variant="subtitle2">Company</Typography>
            </Box>
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: '0 8px 8px 0' }}
            color={userType === 'candidate' ? 'primary' : 'common'}
            onClick={() => setUserType('candidate')}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <PersonIcon />
              <Typography variant="subtitle2">Candidate</Typography>
            </Box>
          </Button>
        </Box>
      )}
      {type === 'signUp' && userType === 'company' && (
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            // helperText="Please enter your password"
            id="demo-helper-text-aligned"
            label="Company Name"
            autoComplete="off"
            value={company}
            error={loading && _isEmpty(company)}
            helperText={
              loading && _isEmpty(company) && 'please fill company name'
            }
            onChange={(e) => handleChange(e, setCompany)}
          />
        </Box>
      )}
      {type === 'signUp' && userType === 'candidate' && (
        <>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              // helperText="Please enter your First Name"
              id="demo-helper-text-aligned"
              label="First Name"
              autoComplete="off"
              value={firstName}
              error={loading && _isEmpty(firstName)}
              helperText={
                loading && _isEmpty(firstName) && 'please fill First name'
              }
              onChange={(e) => handleChange(e, setFirstName)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              // helperText="Please enter your Last Name"
              id="demo-helper-text-aligned"
              label="Last Name"
              autoComplete="off"
              value={lastName}
              error={loading && _isEmpty(lastName)}
              helperText={
                loading && _isEmpty(lastName) && 'please fill Last name'
              }
              onChange={(e) => handleChange(e, setLastName)}
            />
          </Box>
        </>
      )}

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          // helperText="Please enter your email"
          id="demo-helper-text-aligned"
          type="email"
          label="email"
          autoComplete="off"
          value={email}
          error={
            (loading && !emailValidate(email)) || (loading && _isEmpty(email))
          }
          helperText={checkEmail(email)}
          onChange={(e) => handleEmail(e)}
          onKeyPress={(e) => {
            const { charCode } = e
            if (charCode === 13 && type === 'signUp') {
              handleSubmit()
            }
            if (charCode === 13 && type === 'signIn') {
              handleLogin()
            }
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          // helperText="Please enter your password"
          id="demo-helper-text-aligned"
          type="password"
          label="password"
          autoComplete="off"
          value={password}
          error={loading && _isEmpty(password)}
          helperText={loading && _isEmpty(password) && 'please fill password'}
          onChange={(e) => handlePassword(e)}
          onKeyPress={(e) => {
            const { charCode } = e
            if (charCode === 13 && type === 'signUp') {
              handleSubmit()
            }
            if (charCode === 13 && type === 'signIn') {
              handleLogin()
            }
          }}
        />
      </Box>

      {type === 'signIn' && (
        <Box>
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Box>
      )}
      {type === 'signUp' && (
        <Box>
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={() => handleSubmit()}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default SignUp

SignUp.propTypes = {
  type: PropTypes.string.isRequired,
  getImg: PropTypes.func,
  setImg: PropTypes.func,
}
SignUp.defaultProps = {
  getImg: () => {},
  setImg: () => {},
}
