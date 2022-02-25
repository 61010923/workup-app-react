import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CardMedia, Dialog, IconButton, Box,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _toString from 'lodash/toString'
import _inRange from 'lodash/inRange'
import _size from 'lodash/size'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const useStyles = makeStyles(() => ({
  paperDialog: {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
  },
  boxImagePreview: {
    display: 'flex !important',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    '& img': {
      margin: 'auto',
    },
  },
  slide: {
    display: 'none important',
    '& .slick-next': {
      right: '1rem',
      zIndex: 10,
      marginRight: 20,
    },
    '& .slick-prev': {
      left: '1rem',
      zIndex: 10,
      marginLeft: -10,
    },
    '& .slick-next:before': {
      color: 'black',
      fontSize: 50,
      opacity: 0,
    },
    '& .slick-prev:before': {
      color: 'black',
      fontSize: 50,
      opacity: 0,
    },
    '& .slick-prev:hover': {
      opacity: 0,
    },
    '& .slick-next:hover': {
      opacity: 0,
    },
  },
}
))
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  focusOnSelect: true,
}
function ImagePreview({
  titleImg,
  images,
  setImages,
  initialSlide,
  isOpen,
  actionType,
  setIsOpen,
  haveKeepData,
  keepDataLength,
  isCs,
  csIndex,
}) {
  const classes = useStyles()
  const [sequence, setSequence] = useState()
  const handleDelete = () => {
    const pic = [...images]
    pic.splice(sequence, 1)
    setImages(pic)
  }
  const handleSequence = (n) => {
    setSequence(n)
  }
  useEffect(() => {
    if (_isEmpty(images)) {
      if (isCs) {
        setIsOpen((prev) => ({
          ...prev,
          [csIndex]: false,
        }))
      } else {
        setIsOpen(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])
  useEffect(() => {
    if (haveKeepData) {
      setSequence(initialSlide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])
  return (
    <Dialog
      open={isOpen}
      close={_toString(!isOpen)}
      fullScreen
      className={classes.paperDialog}
    >
      <Box className={classes.slide}>
        <Slider
          {...settings}
          initialSlide={initialSlide}
          beforeChange={(c, n) => handleSequence(n)}
        >
          {
              _map(images, (c, i) => {
                const imgKey = `img_${i}`
                return (
                  <Box
                    className={classes.boxImagePreview}
                    key={imgKey}
                  >
                    <CardMedia
                      component="img"
                      title={`${titleImg}_${i}`}
                      src={c}
                      style={{
                        // height: '100%',
                        maxHeight: 'calc(100vh-16px)',
                        minWidth: '100px',
                        maxWidth: '900px',
                        padding: 64,
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                )
              })
            }
        </Slider>
      </Box>
      {_size(images) > 1 && (
      <Box position="absolute" top={0} left={0} height="100vh" display="flex" alignItems="center" mt="15px" pl={2}>
        <IconButton
          size="small"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
      </Box>
      )}
      {_size(images) > 1 && (
      <Box position="absolute" top={0} right={0} height="100vh" display="flex" alignItems="center" mt="15px" pr={2}>
        <IconButton
          size="small"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>
      </Box>
      )}
      {(actionType !== 'view' && !haveKeepData) && (
      <Box position="absolute" bottom={0} mb={2} width="100%">
        <Box mx={8} display="flex" justifyContent="center">
          <IconButton
            size="small"
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      )}
      {
          (haveKeepData && actionType !== 'view' && !_inRange(sequence, keepDataLength)) && (
            <Box position="absolute" bottom={0} mb={2} width="100%">
              <Box mx={8} display="flex" justifyContent="center">
                <IconButton
                  size="small"
                  style={{ backgroundColor: 'black', color: 'white' }}
                  onClick={handleDelete}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )
        }
      <Box position="absolute" mt={2} mr={2} top={0} right={0}>
        <IconButton
          size="small"
          style={{ backgroundColor: 'black', color: 'white' }}
          onClick={() => {
            if (isCs) {
              setIsOpen((prev) => ({
                ...prev,
                [csIndex]: false,
              }))
            } else {
              setIsOpen(false)
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Dialog>
  )
}
export default ImagePreview
ImagePreview.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSlide: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isCs: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  setImages: PropTypes.func,
  titleImg: PropTypes.string,
  setIsOpen: PropTypes.func.isRequired,
  haveKeepData: PropTypes.bool,
  keepDataLength: PropTypes.number,
  csIndex: PropTypes.number,
}

ImagePreview.defaultProps = {
  setImages: () => { },
  titleImg: 'image',
  haveKeepData: false,
  keepDataLength: 0,
  csIndex: 0,
}
