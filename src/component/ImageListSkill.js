import ImageList from '@mui/material/ImageList'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import ImageListItem from '@mui/material/ImageListItem'
import Box from '@mui/material/Box'
import _map from 'lodash/map'
import { Skeleton, Typography } from '@mui/material'
import ImagePreview from './ImagePreview'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

const useStyle = makeStyles((theme) => ({
  text: {
    display: 'none',
    color: 'none',
    fontSize: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 100,
  },
}))

export default function QuiltedImageList(props) {
  const classes = useStyle()
  const { imgList, loading } = props
  const [itemData, setItemData] = useState([])
  const [style, setStyle] = useState({ display: 'none' })
  const [isOpen, setIsOpen] = useState(false)
  const [initialSlide, setInitialSlide] = useState(0)
  const handleClick = (index) => {
    setIsOpen(true)
    setInitialSlide(index)
  }

  const formatImgList = () => {
    const myArr = []
    imgList.forEach((data, i) => {
      const pic = imgList.length
      myArr.push({
        img: data,
        cols: i % 5 === 0
        || (i === 1 && pic === 2) || (i === 1 && pic === 3) || i === (pic - 1 && pic !== 5) ? 2 : 1,
        rows: i % 5 === 0 || (i === 1 && pic === 2) ? 2 : 1,
      })
    })
    setItemData(myArr)
  }
  useEffect(() => {
    formatImgList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgList])
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!loading ? (
        <>
          <ImageList
            sx={{ width: '100%', height: '100%', borderRadius: '6px' }}
            variant="quilted"
            cols={4}
            gap={2}
            rowHeight={200}
          >
            {_map(itemData, (item, i) => (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {i < 5 && (
                <ImageListItem
                  key={item.img + i}
                  component="image"
                  onMouseEnter={() => {
                    if (i === 4) {
                      setStyle({ display: 'block' })
                    }
                  }}
                  onMouseLeave={() => {
                    if (i === 4) {
                      setStyle({ display: 'none' })
                    }
                  }}
                  sx={{
                    transition: 'opacity 0.5s',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: '0.8',
                    },
                  }}
                  onClick={() => handleClick(i)}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                  className={classes.hover}
                >
                  <img
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...srcset(item.img, 121, item.cols, item.rows)}
                    alt={item.title}
                    style={{ cursor: 'pointer' }}
                    loading="lazy"
                  />
                  {i > 4 && (
                  <Box className={classes.text} sx={{ ...style }}>
                    <Box display="flex" alignItems="center">
                      <AddIcon fontSize="small" color="primary" />
                      <Typography variant="h6" color="primary">
                        {itemData.length - 5}
                      </Typography>
                    </Box>
                  </Box>
                  )}
                </ImageListItem>
                )}
              </>
            ))}
          </ImageList>
          <ImagePreview
            images={_map(itemData, (data) => data.img)}
            initialSlide={initialSlide}
            actionType="view"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      ) : (
        <Skeleton height={200} />
      )}
    </>

  )
}

QuiltedImageList.propTypes = {
  imgList: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
}

QuiltedImageList.defaultProps = {
  loading: false,
}
