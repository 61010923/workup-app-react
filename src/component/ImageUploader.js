import React, { useState } from 'react'
import {
  Box, Button, IconButton,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { red } from '@mui/material/colors'
import ImageIcon from '@mui/icons-material/Image'

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  },
  image: {
    margin: '1rem',
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    position: 'absolute',
    right: '0',
    zIndex: '5',
  },
  imageSize: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '1rem',
    // border: '1px solid #fff',
    boxShadow: '0px 0px 10px rgba(0,0,0,.5)',
  },
})
function ImageUploader() {
  const classes = useStyles()
  const [selectedFiles, setSelectedFiles] = useState([])
  const removeImage = (index) => {
    const data = [...selectedFiles]
    data.splice(index, 1)
    setSelectedFiles(data)
  }
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setSelectedFiles((prevImages) => prevImages.concat(filesArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file), // avoid memory leak
      )
    }
  }
  return (
    <>
      <Box sx={{ mt: 1 }}>
        <label htmlFor="file" className="label">
          <input type="file" id="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageChange} style={{ display: 'none' }} />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            component="span"
            endIcon={<ImageIcon />}
          >
            อัปโหลดผลงาน
          </Button>
          <Typography variant="caption">
            เฉพาะ PNG, JPG หรือ JPEG
          </Typography>
        </label>
      </Box>
      <Box className={classes.container}>
        {selectedFiles.map((photo, index) => (
          <Box className={classes.image}>
            <Box className={classes.button}>
              <IconButton color="primary" onClick={() => removeImage(index)} aria-label="delete">
                <DeleteForeverIcon />
              </IconButton>

            </Box>
            <img className={classes.imageSize} src={photo} alt="" key={photo} />

          </Box>
        ))}
      </Box>
    </>
  )
}

export default ImageUploader
