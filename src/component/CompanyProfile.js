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
    name, imgProfile, setImgProfile, imgCover, setImgCover, email, haveEmail, actionType,
  } = props
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.profileContainer}>
        <CoverPhoto imgCover={imgCover} setImgCover={setImgCover} actionType={actionType} />

      </Box>
      <Box className={classes.profile}>
        <AvatarPhoto
          variant="rounded"
          firstName={name}
          state={imgProfile}
          setState={setImgProfile}
          actionType={actionType}
        />
      </Box>
      <Box sx={{
        display: 'flex', flexDirection: 'column', mt: 5,
      }}
      >
        <Typography variant="h5">
          {name}
        </Typography>
        { haveEmail && (
        <Typography variant="body2">

          <span className={classes.email}>{email}</span>
          &nbsp;- Company
        </Typography>

        )}
      </Box>

    </Box>
  )
}

export default UserProfile

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  imgProfile: PropTypes.string.isRequired,
  imgCover: PropTypes.string.isRequired,
  haveEmail: PropTypes.bool,
  email: PropTypes.string.isRequired,
  setImgCover: PropTypes.func.isRequired,
  setImgProfile: PropTypes.func.isRequired,
  actionType: PropTypes.string,
}

UserProfile.defaultProps = {
  haveEmail: false,
  actionType: 'view',
}
