import React, { useState } from 'react'
import {
  Box, Button, IconButton, Skeleton,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import ImageIcon from '@mui/icons-material/Image'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import _map from 'lodash/map'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import useImageUpload from '../libs/useImageUpload'

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  },
  image: {
    margin: '1rem',
    maxHeight: '240px',
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    position: 'absolute',
    right: '0',
    top: '0',
    zIndex: '5',
  },
  imageSize: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    // border: '1px solid #fff',
    boxShadow: '0px 0px 10px rgba(0,0,0,.5)',
  },
})

function ImageUploader({
  loading, error, state, setState,
}) {
  // const uploadImage = useImageUpload()
  // const handleImageChange = async (e) => {
  //   const imgUrl = await uploadImage(e)
  //   setState(imgUrl)
  // }

  const classes = useStyles()
  const uploadImage = useImageUpload()
  const removeImage = (index) => {
    const data = [...state]
    data.splice(index, 1)
    setState(data)
  }
  const handleImageChange = async (e) => {
    const imgUpload = await uploadImage(e)
    const data = [...state]
    data.push(imgUpload)
    setState(data)
  }
  return (
    <>
      <Box>
        <label htmlFor="file" className="label">
          <input type="file" id="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageChange} style={{ display: 'none' }} />
          <Button
            variant="outlined"
            color={error && _isEmpty(state) ? 'error' : 'primary'}
            fullWidth
            component="span"
            endIcon={<ImageIcon />}
          >
            อัปโหลดผลงาน
          </Button>

          <Box sx={{ display: 'flex', flexDirection: 'column', margin: '3px 14px 0' }}>
            {error && _isEmpty(state)
             && (
             <Typography
               variant="caption"
               color="error"
             >
               Please upload image
             </Typography>
             )}
            <Typography
              variant="caption"
            >
              เฉพาะ PNG, JPG หรือ JPEG
            </Typography>
          </Box>
        </label>
      </Box>
      <Box className={classes.container}>
        {loading ? (
          <Skeleton key="skeleton" variant="rectangular" height={240} sx={{ borderRadius: '8px' }} />
        ) : (
          _map(state, (photo, index) => (
            <Box key={`image${index}`} className={classes.image}>
              <Box className={classes.button}>
                <IconButton color="error" onClick={() => removeImage(index)} aria-label="delete">
                  <RemoveCircleOutlineIcon />
                </IconButton>

              </Box>
              <img className={classes.imageSize} src={photo} alt="" key={photo} />

            </Box>
          )))}
      </Box>
    </>
  )
}

export default ImageUploader
ImageUploader.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool,
  state: PropTypes.arrayOf(PropTypes.any),
  setState: PropTypes.func,
}
ImageUploader.defaultProps = {
  error: null,
  loading: null,
  state: [],
  setState: () => {},
}
