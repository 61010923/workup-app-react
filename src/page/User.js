import React from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import UserProfile from '../component/UserProfile'
import UserForm from '../component/UserForm'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    margin: '2rem 5rem',
    justifyContent: 'center',
    flexDirection: 'column',
  },

})
function User() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)', borderRadius: 2, display: 'flex', justifyContent: 'center',
      }}
      >
        <UserProfile />
      </Box>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)', borderRadius: 2, mt: 2,
      }}
      >
        <UserForm />
      </Box>
    </Box>

  )
}

export default User
