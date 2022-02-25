import React, { useState } from 'react'
import {
  Box, Avatar, IconButton, Button, Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles({

  Avatar: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

function UserProfile() {
  const classes = useStyles()
  const [picture, setPicture] = useState(null)
  const [style, setStyle] = useState({ display: 'none' })
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <Tooltip title="Change cover photo">
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
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.7',
          },
        }}
      >

        <label htmlFor="icon-button-cover-photo">
          <input
            accept=".png, .jpg, .jpeg"
            id="icon-button-cover-photo"
            type="file"
            style={{ display: 'none' }}
            onChange={onChangePicture}
          />
          <Avatar
            alt="Profile"
            src={picture && picture}
            sx={{
              width: '100%',
              height: '15rem',
              cursor: 'pointer',

            }}
            variant="rounded"
          >
            P
          </Avatar>

        </label>
        <EditIcon
          color="primary"
          sx={{
            ...style,
            fontSize: 50,
          }}
          className={classes.iconButton}
        />
      </Box>
    </Tooltip>

  )
}

export default UserProfile
