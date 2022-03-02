import React, { useState, useEffect } from 'react'
import {
  Box, Avatar, IconButton, Button, Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import { green, pink } from '@mui/material/colors'
import PropTypes from 'prop-types'
import useImageUpload from '../libs/useImageUpload'

const useStyles = makeStyles({
  Avatar: {
    position: 'relative',
    zIndex: '1',
    cursor: 'pointer',
  },
  avatarBgc: {
    backgroundColor: '#fff',
    width: '8rem',
    height: '8rem',
    position: 'absolute',
    top: '0',
    left: '0',
    borderRadius: '8px',
  },
  iconButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

function AvatarPhoto({
  variant, profile, firstName, state, setState,
}) {
  const classes = useStyles()
  const uploadImage = useImageUpload()
  const [style, setStyle] = useState({ display: 'none' })
  const onChangePicture = async (e) => {
    const imgUrl = await uploadImage(e)
    setState(imgUrl)
  }

  useEffect(() => {
    setState(profile)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])
  return (
    <Box>
      <Tooltip title="Change Profile">
        <Box
          className={classes.Avatar}
          onMouseEnter={(e) => {
            setStyle({ display: 'block' })
          }}
          onMouseLeave={(e) => {
            setStyle({ display: 'none' })
          }}
          sx={{
            transition: 'opacity 0.5s',
            '&:hover': {
              opacity: '0.7',
            },
          }}
        >
          <label htmlFor="icon-button-profile">
            <input
              accept=".png, .jpg, .jpeg"
              id="icon-button-profile"
              type="file"
              style={{ display: 'none' }}
              onChange={onChangePicture}
            />
            <Avatar
              alt="Profile"
              src={state}
              sx={{
                width: '8rem',
                height: '8rem',
                bgcolor: green[500],
                cursor: 'pointer',
              }}
              variant={variant}
            >
              {firstName.charAt(0).toUpperCase()}
            </Avatar>
            <EditIcon
              color="primary"
              sx={{
                ...style,
                fontSize: 50,
                cursor: 'pointer',
              }}
              className={classes.iconButton}
            />
          </label>
        </Box>
      </Tooltip>
      {variant !== '' && (
      <Box className={classes.avatarBgc} />
      )}
    </Box>
  )
}

export default AvatarPhoto
AvatarPhoto.propTypes = {
  variant: PropTypes.string,
  profile: PropTypes.string,
  firstName: PropTypes.string,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,

}
AvatarPhoto.defaultProps = {
  variant: '',
  profile: '',
  firstName: 'P',
}
