import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import _isEmpty from 'lodash/isEmpty'
// import { spacing, borders } from '@mui/system'

const useStyles = makeStyles({
  flexBox: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'space-evenly',
    marginBottom: '16px',
    // backgroundColor: 'orange',

  },
  // container: {
  //   width: '100vw',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   minHeight: '100vh',
  //   flexDirection: 'column',
  //   // backgroundColor: 'red',
  // },
})
function SignIn() {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  console.log(firstName)
  console.log(lastName)
  console.log(email)
  console.log(password)
  const emailValidate = (e) => {
    const re = /\S+@\S+\.\S+/
    return re.test(e)
  }
  const checkEmail = (e) => {
    let errorMessage = ''
    if (loading && !emailValidate(email)) {
      errorMessage = 'please check email'
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
      <Box sx={{
        border: 2, borderColor: 'primary.main', borderRadius: 2, padding: '8px',
      }}
      >

        <Typography align="center" variant="h6">Sign In</Typography>

        <Box className={classes.flexBox} mt={2}>
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
        <Box className={classes.flexBox}>
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

          <TextField
            fullWidth
          // helperText="Please enter your password"
            id="demo-helper-text-aligned"
            type="password"
            label="passwords"
            autoComplete="off"
            value={password}
            error={(loading && _isEmpty(password))}
            helperText={(loading && _isEmpty(password)) && ('please fill password')}
            onChange={(e) => handlePassword(e)}

          />
        </Box>
        <Box>
          <Button fullWidth variant="contained" onClick={() => setLoading(true)}>Save</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SignIn
