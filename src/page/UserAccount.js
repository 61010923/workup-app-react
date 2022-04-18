import React, { useState } from 'react'
import {
  Box, Button, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import _isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import _every from 'lodash/every'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ValidatePassword from '../component/ValidatePassword'
import userDetail from '../redux/selector/user.selector'

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
    minHeight: '76.5vh',
  },
})

function AccountTab() {
  const classes = useStyles()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const [loading, setLoading] = useState(false)
  const [openError, setOpenError] = useState(false)
  const emailValidate = (e) => {
    const re = /\S+@\S+\.\S+/
    return re.test(e)
  }
  // const checkEmail = (e) => {
  //   let errorMessage = ''
  //   if (openError && !emailValidate(email)) {
  //     errorMessage = 'please check email'
  //   }
  //   if (openError && _isEmpty(email)) {
  //     errorMessage = 'please fill email'
  //   }
  //   return errorMessage
  // }
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
      oldPassword,
      newPassword,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/update-password`,
        body,
        { headers: { authorization: userToken } },
      )
      if (response.status === 201) {
        console.log('complete')
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
          variant="h6"
          color="primary"
        >
          CHANGE PASSWORD
        </Typography>
        <TextField
          sx={{ mt: 2 }}
          required
          id="demo-helper-text-aligned"
          label="Old Password"
          type="password"
          value={oldPassword}
          error={openError && _isEmpty(oldPassword)}
          helperText={
                  openError && _isEmpty(oldPassword) && 'please fill password'
                }
          onChange={(e) => handleChange(e, setOldPassword)}
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
