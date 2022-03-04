import React, { useState } from 'react'
import {
  Box, Avatar, IconButton, Button, Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'
import useImageUpload from '../libs/useImageUpload'

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

function UserProfile(props) {
  const { imgCover, setImgCover } = props
  const classes = useStyles()
  const imageUpload = useImageUpload()
  const [style, setStyle] = useState({ display: 'none' })
  const onChangePicture = async (e) => {
    const imgUpload = await imageUpload(e)
    setImgCover(imgUpload)
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
            src={imgCover}
            component="image"
            sx={{
              width: '100%',
              height: '15rem',
              // height: 'auto',
              // maxHeight: '400px',
              cursor: 'pointer',
              objectFit: 'contain',

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

UserProfile.propTypes = {
  imgCover: PropTypes.string.isRequired,
  setImgCover: PropTypes.func.isRequired,
}
