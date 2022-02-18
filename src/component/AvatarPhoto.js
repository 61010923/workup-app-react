import React, { useState } from 'react'
import {
  Box, Avatar, IconButton, Button, Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import { green, pink } from '@mui/material/colors'
import PropTypes from 'prop-types'

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

function AvatarPhoto({ variant }) {
  const classes = useStyles()
  const [picture, setPicture] = useState(null)
  const [style, setStyle] = useState({ display: 'none' })
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <>
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
              src={picture && picture}
              sx={{
                width: '8rem',
                height: '8rem',
                bgcolor: green[500],
                cursor: 'pointer',

              }}
              variant={variant}
            >
              P
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
      <Box className={classes.avatarBgc} />

    </>
  )
}

export default AvatarPhoto
AvatarPhoto.propTypes = {
  variant: PropTypes.string.isRequired,
}