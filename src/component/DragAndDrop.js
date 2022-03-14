import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box, Button, Typography, IconButton, Tooltip,
} from '@mui/material'
import _map from 'lodash/map'
import { isEmpty, reject } from 'lodash'
import { makeStyles } from '@mui/styles'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import useImageUpload from '../libs/useImageUpload'
import pdfImage from '../image/pdf.png'

const useStyles = makeStyles((theme) => (
  {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '10px',
    // height: '15rem',
    },
    dragBx: {
      height: '15rem',
      // backgroundColor: '#333',
      border: '1px solid #333',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 10,
    },
    fileBx: {
      backgroundColor: '#f5f5f56b',
      height: '15rem',
      // overflowY: 'scroll',
    },
    fileList: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid black',
      marginBottom: '8px',
      padding: '8px',
    },
    pdfImage: {
      minWidth: '2.5rem',
      height: '2.5rem',
      marginRight: '0.5rem',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    cropText: {
      maxWidth: '10em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.up(600)]: {
        maxWidth: '15em',

      },
      [theme.breakpoints.up(700)]: {
        maxWidth: '20em',

      },
      [theme.breakpoints.up(800)]: {
        maxWidth: '25em',

      },
      [theme.breakpoints.up(815)]: {
        maxWidth: '10em',

      },
      [theme.breakpoints.up(915)]: {
        maxWidth: '15em',

      },
      [theme.breakpoints.up(1015)]: {
        maxWidth: '20em',

      },
      [theme.breakpoints.up(1200)]: {
        maxWidth: '25em',

      },
      [theme.breakpoints.up(1500)]: {
        maxWidth: '30em',

      },
    },
  }
))
function App() {
  const classes = useStyles()

  const [myFiles, setMyFiles] = useState([])
  //   const uploadImage = useImageUpload([])
  const [imageFile, setImageFile] = useState('')

  const removeFile = (file) => {
    setMyFiles((oldStateVal) => reject(oldStateVal, { id: file }))
  }
  const handleFileInputChange = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImageFile(reader.result)
    }
  }
  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = [...myFiles, ...acceptedFiles]
      const filesWithId = files.map((item, index) => ({
        id: index + 1,
        lastModified: item.lastModified,
        lastModifiedDate: item.lastModifiedDate,
        name: item.name,
        size: item.size,
        type: item.type,
        webkitRelativePath: item.webkitRelativePath,
      }))
      // handleFileInputChange(acceptedFiles[0])
      setMyFiles(files)
    },
    [myFiles],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop,
  })
  return (
    <Box className={classes.container}>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Box {...getRootProps()} className={classes.dragBx}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        <CloudUploadOutlinedIcon sx={{ fontSize: '6rem', color: 'primary.main' }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography>Drop files here</Typography>
          <Typography>or</Typography>
        </Box>
        <Button variant="contained" size="small" sx={{ textTransform: 'capitalize' }}>
          Browse
        </Button>
      </Box>
      <Box className={classes.fileBx}>
        {_map(myFiles, (file) => (
          <Box key={file.id}>
            <Box className={classes.fileList}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box className={classes.pdfImage}>
                  <img src={pdfImage} alt="pdf" />
                </Box>
                <Box>

                  <Tooltip title={file.name}>
                    <Typography className={classes.cropText}>
                      {file.name}
                    </Typography>
                  </Tooltip>
                  <Typography variant="caption" sx={{ color: '#b1b1b1' }}>
                    {file.size}
                    {' '}
                    bytes
                  </Typography>
                </Box>
              </Box>

              <Box>
                <IconButton onClick={() => removeFile(file.id)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default App
