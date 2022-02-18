import React, { useState } from 'react'
import {
  Box,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import CoverPhoto from './CoverPhoto'
import AvatarPhoto from './AvatarPhoto'

const useStyles = makeStyles({
  container: {
    padding: '1rem',
    // height: '20rem',
    // alignItems: 'center',
  },
  email: {
    color: 'blue',
  },
  profileContainer: {
    position: 'relative',
  },
  profile: {
    position: 'absolute',
    top: '12rem',
    left: '8rem',
    zIndex: '10',
  },

})

function UserProfile() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.profileContainer}>
        <CoverPhoto />

      </Box>
      <Box className={classes.profile}>
        <AvatarPhoto variant="rounded" />
      </Box>
      <Box sx={{
        display: 'flex', flexDirection: 'column', mt: 5,
      }}
      >
        <Typography variant="h5">
          Pug Dog Company
        </Typography>
        <Typography variant="body2">

          <span className={classes.email}>PugCompany@gmail.com</span>
          &nbsp;- Company
        </Typography>

      </Box>

    </Box>
  )
}

export default UserProfile
