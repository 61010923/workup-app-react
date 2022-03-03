import React, { useState } from 'react'
import {
  Box,
} from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import CoverPhoto from './CoverPhoto'
import AvatarPhoto from './AvatarPhoto'

const useStyles = makeStyles({
  container: {
    padding: '1rem',
    position: 'relative',
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
    top: '45%',
    left: '5%',
    zIndex: '10',
  },

})

function UserProfile(props) {
  const {
    name, imgProfile, imgCover, email,
  } = props
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.profileContainer}>
        <CoverPhoto />

      </Box>
      <Box className={classes.profile}>
        <AvatarPhoto variant="rounded" profile={name} setState={() => {}} />
      </Box>
      <Box sx={{
        display: 'flex', flexDirection: 'column', mt: 5,
      }}
      >
        <Typography variant="h5">
          {name}
        </Typography>
        <Typography variant="body2">

          <span className={classes.email}>{email}</span>
          &nbsp;- Company
        </Typography>

      </Box>

    </Box>
  )
}

export default UserProfile

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  imgProfile: PropTypes.string.isRequired,
  imgCover: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}
