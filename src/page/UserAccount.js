import React, { useState } from 'react'
import {
  Box, Button, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import _isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import _every from 'lodash/every'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ValidatePassword from '../component/ValidatePassword'

const useStyles = makeStyles({
  formContainer: {
    width: '75%',
    margin: '0 auto',
    boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',
    padding: '2rem',

  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '77vh',
  },
})

function AccountTab() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [openError, setOpenError] = useState(false)
  const emailValidate = (e) => {
    const re = /\S+@\S+\.\S+/
    return re.test(e)
  }
  const checkEmail = (e) => {
    let errorMessage = ''
    if (openError && !emailValidate(email)) {
      errorMessage = 'please check email'
    }
    if (openError && _isEmpty(email)) {
      errorMessage = 'please fill email'
    }
    return errorMessage
  }
  const handleChange = (e, setValue) => {
    const { value } = e.target
    // const name = e.target.value
    setValue(value)
  }
  function validatePassword(pw) {
    // eslint-disable-next-line no-new-object
    const checkPassword = new Object()
    checkPassword.upper = /[A-Z]/.test(pw)
    checkPassword.lower = /[a-z]/.test(pw)
    checkPassword.number = /[0-9]/.test(pw)
    checkPassword.length = pw.length > 8
    return checkPassword
  }
  const handleSubmit = async () => {
    setLoading(true)
    setOpenError(true)
    const body = {
      email,
      password,
      newPassword,

    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, body)
      if (response.status === 201) {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <Box
      className={classes.container}

    >
      <Box
        className={classes.formContainer}
        sx={{
          backgroundColor: 'rgb(248 248 248)', borderRadius: 2,
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          ACCOUNT
        </Typography>
        <TextField
          sx={{ mt: 2 }}
          required
          id="demo-helper-text-aligned"
          label="Old Password"
          type="password"
          value={password}
          error={openError && _isEmpty(password)}
          helperText={
                  openError && _isEmpty(password) && 'please fill password'
                }
          onChange={(e) => handleChange(e, setPassword)}
          autoComplete="off"
          fullWidth
        />
        <TextField
          sx={{ mt: 2 }}
          required
          id="demo-helper-text-aligned"
          label="New Password"
          type="password"
          value={newPassword}
          error={openError && !_every(validatePassword(newPassword), (item) => item === true)}
          // helperText={
          //         openError && _isEmpty(newPassword) && 'please fill password'
          //       }
          onChange={(e) => handleChange(e, setNewPassword)}
          autoComplete="off"
          fullWidth
        />
        {openError
      && (
      <ValidatePassword password={newPassword} />
      )}
        <Button sx={{ mt: 2 }} onClick={() => handleSubmit()} fullWidth variant="contained">save</Button>

      </Box>
    </Box>

  )
}
export default AccountTab
