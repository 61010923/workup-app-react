import React, { useState } from 'react'
import {
  Box, Button,
} from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { useNavigate } from 'react-router-dom'
import CoverPhoto from './CoverPhoto'
import AvatarPhoto from './AvatarPhoto'
import TypographyLoading from './Typography'

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
    top: '13.5rem',
    left: '100px',
    transform: 'translate(-50%, -50%)',

    zIndex: '10',
  },

})

function UserProfile(props) {
  const {
    name, imgProfile, setImgProfile, imgCover, setImgCover, email, haveEmail, actionType,
    loading,
  } = props
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <Box className={classes.container}>
      <Box className={classes.profileContainer}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={240}
            sx={{
              borderRadius: '8px',
            }}
          />
        ) : (
          <CoverPhoto
            imgCover={imgCover}
            setImgCover={setImgCover}
            actionType={actionType}
          />
        )}
      </Box>
      <Box className={classes.profile}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={128}
            height={128}
            sx={{
              borderRadius: '8px',
            }}
          />
        ) : (
          <AvatarPhoto
            variant="rounded"
            firstName={name}
            state={imgProfile}
            setState={setImgProfile}
            actionType={actionType}
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 5,
          maxWidth: '300px',
        }}
      >
        <TypographyLoading
          loading={loading}
          heightSkeleton={20}
          variant="h5"
        >
          {name}
        </TypographyLoading>
        {haveEmail && (
          <TypographyLoading
            loading={loading}
            heightSkeleton={20}
            variant="body2"
          >
            <span className={classes.email}>{email}</span>
            &nbsp;- Company
          </TypographyLoading>
        )}
        {actionType === 'edit' && (
          <Button
            onClick={() => navigate('/CompanyAccount')}
            startIcon={<ManageAccountsOutlinedIcon />}
            variant="outlined"
            color="info"
            size="small"
            sx={{ borderRadius: '1rem', width: '80%', mt: 1 }}
          >
            Change password
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default UserProfile

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
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
