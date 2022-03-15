import React, { useState, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box, Button, Typography, IconButton, Tooltip,
} from '@mui/material'
import _map from 'lodash/map'
import { makeStyles } from '@mui/styles'
import _isEmpty from 'lodash/isEmpty'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import pdfImage from '../image/pdf.png'
import { alertBar } from '../redux/action/alert.action'
import usePdfUpload from '../libs/usePdfUpload'

const useStyles = makeStyles((theme) => (
  {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '10px',
    // height: '15rem',
    },
    dragBx: {
      height: '15rem',
      // backgroundColor: '#333',
      border: `3px dashed ${theme.palette.primary.main}`,
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 10,
      '&:hover': {
        backgroundColor: '#f5f5f56b',
      },
    },
    fileBx: {
      backgroundColor: '#f5f5f56b',
      maxHeight: '15rem',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#E6E6E6',
        borderRadius: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#9C9C9C',
        borderRadius: '8px',

      },
    },
    fileList: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid #93939336',
      borderRadius: '8px',
      marginBottom: '8px',
      marginRight: '6px',
      marginLeft: '1px',
      padding: '8px',
      // transition: 'box-shadow 0.2s',
      '&:hover': {
        boxShadow: '3px 3px 3px rgba(0,0,0,0.2),-1px -1px 1px rgba(0,0,0,0.05)',
      },
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
      [theme.breakpoints.up(760)]: {
        maxWidth: '25em',

      },
      [theme.breakpoints.up(795)]: {
        maxWidth: '10em',

      },
      [theme.breakpoints.up(915)]: {
        maxWidth: '15em',

      },
      [theme.breakpoints.up(1100)]: {
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
function App({ myFiles, setMyFiles }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const pdfUpload = usePdfUpload()
  const fileSize = useMemo(() => myFiles.reduce((a, b) => a + b.size, 0), [myFiles])
  const [progress, setProgress] = React.useState([0])
  const removeFile = (index) => {
    const data = [...myFiles]
    data.splice(index, 1)
    setMyFiles(data)
  }
  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    // eslint-disable-next-line radix
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`
  }
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (fileSize <= 5000000) {
        const upload = await pdfUpload(acceptedFiles)
        const newFile = { fileUrl: upload, name: acceptedFiles[0].name, size: acceptedFiles[0].size }
        const files = [...myFiles, newFile]
        // const filesWithId = files.map((item, index) => ({
        //   id: index + 1,
        //   lastModified: item.lastModified,
        //   lastModifiedDate: item.lastModifiedDate,
        //   name: item.name,
        //   size: item.size,
        //   type: item.type,
        //   webkitRelativePath: item.webkitRelativePath,
        // }))
        setMyFiles(files)
      } else {
        dispatch(alertBar(true, 'error', 3000, 'Maximum upload file size: 5 MB'))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myFiles],
  )
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop,
  })
  return (
    <Box className={classes.container}>

      <Box>
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
        <Box>
          <Typography variant="caption">Accepted file type: .pdf only (Maximum upload file size: 5 MB)</Typography>
        </Box>
      </Box>
      <Box className={classes.fileBx}>
        {_map(myFiles, (file, i) => (
          <Box key={file.id}>
            <Box className={classes.fileList}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box className={classes.pdfImage}>
                  <img src={pdfImage} alt="pdf" />
                </Box>
                <Box>

                  <Tooltip title={file.name}>
                    <Typography className={classes.cropText} sx={{ cursor: 'pointer' }} onClick={() => window.open(file.fileUrl)}>
                      {file.name}
                    </Typography>
                  </Tooltip>
                  <Typography variant="caption" sx={{ color: '#939393' }}>
                    {bytesToSize(file.size)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <IconButton onClick={() => removeFile(i)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            {/* <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={progress[i]} />
            </Box> */}
          </Box>

        ))}
      </Box>

    </Box>
  )
}

export default App
App.propTypes = {
  myFiles: PropTypes.arrayOf(PropTypes.any).isRequired,
  setMyFiles: PropTypes.func.isRequired,
}
