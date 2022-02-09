import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { makeStyles, styled } from '@mui/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { purple } from '@mui/material/colors'

const useStyles = makeStyles({
  flexBox: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'space-evenly',
    marginBottom: '16px',
    // backgroundColor: 'orange',

  },
})

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}))
function SignUp(props) {
  const classes = useStyles()
  const { type } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState(false)
  // console.log(firstName)
  // console.log(lastName)
  // console.log(email)
  // console.log(password)
  console.log(`%c${userType}`, 'font-weight:bold; background-color: cyan;')
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
  // console.log(emailValidate(email))
  const handleChange = (e, setValue) => {
    const { value } = e.target
    // const name = e.target.value
    setValue(value)
  }
  const handleEmail = (e) => {
    const { value } = e.target
    setEmail(value)
  }
  const handlePassword = (e) => {
    const { value } = e.target

    setPassword(value)
  }
  return (

    <Box>
      {type === 'signUp' && (
        <>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
          // helperText="Please enter your First Name"
              id="demo-helper-text-aligned"
              label="First Name"
              autoComplete="off"
              value={firstName}
              error={(loading && _isEmpty(firstName))}
              helperText={(loading && _isEmpty(firstName)) && ('please fill First name')}
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
              error={(loading && _isEmpty(lastName))}
              helperText={(loading && _isEmpty(lastName)) && ('please fill Last name')}
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
          error={(loading && !emailValidate(email)) || (loading && _isEmpty(email))}
          helperText={checkEmail(email)}
          onChange={(e) => handleEmail(e)}
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
          error={(loading && _isEmpty(password))}
          helperText={(loading && _isEmpty(password)) && ('please fill password')}
          onChange={(e) => handlePassword(e)}
        />
      </Box>
      {type === 'signUp' && (
      <Box>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Company" control={<Radio />} label="Company" onClick={() => setUserType(true)} />
            <FormControlLabel value="Member" control={<Radio />} label="Member" onClick={() => setUserType(false)} />
          </RadioGroup>
        </FormControl>
      </Box>
      )}
      {userType === true && (
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
          // helperText="Please enter your password"
            id="demo-helper-text-aligned"
            label="company"
            autoComplete="off"
            value={company}
            error={(loading && _isEmpty(company))}
            helperText={(loading && _isEmpty(company)) && ('please fill company name')}
            onChange={(e) => handleChange(e, setCompany)}
          />
        </Box>
      )}
      {type === 'signIn' && (
      <Box>
        <Button fullWidth variant="contained" onClick={() => setLoading(true)}>Login</Button>
      </Box>
      )}
      {type === 'signUp' && (
      <Box>
        <Button fullWidth variant="contained" onClick={() => setLoading(true)}>Sign Up</Button>
      </Box>
      )}
    </Box>

  )
}

export default SignUp

SignUp.propTypes = {
  type: PropTypes.string.isRequired,
}
