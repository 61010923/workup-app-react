import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'
import clsx from 'clsx'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import _startCase from 'lodash/startCase'
import sony from '../image/sony.png'

const useStyles = makeStyles((theme) => ({

  card: {
    position: 'relative',
    minWidth: '300px',
    height: '300px',
    margin: '20px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    background: '#333',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'fill',
    },
    '&:hover': {
      '& $content': {
        bottom: '0',
      },
      '& $text': {
        opacity: 1,
        transform: 'translateY(0px)',
      },

      '& $sciChild': {
        transform: 'translateY(0px)',
        opacity: 1,
      },

    },
  },
  content: {
    position: 'absolute',
    bottom: '-175px',
    width: '100%',
    height: '160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    flexDirection: 'column',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 -10px 10px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255, 255,0.2)',
    transition: 'bottom 0.5s',
  },
  text: {
    color: theme.palette.primary.main,
    letterSpacing: '2px',
    textAlign: 'center',
    margin: '20px 0 15px',
    transition: '0.5s',
    transitionDelay: '0.6s',
    opacity: 0,
    transform: 'translateY(-20px)',
  },
  sci: {
    position: 'relative',
    margin: '15px 0',
    display: 'flex',
    '& $sciChild': {
      '&:nth-child(1)': {
        transitionDelay: '0.2s',
        transitionProperty: 'transform',
      },
      '&:nth-child(2)': {
        transitionDelay: '0.4s',
      },
      '&:nth-child(3)': {
        transitionDelay: '0.6s',
      },
    },

  },
  sciChild: {
    margin: '0 10px',
    transform: 'translateY(40px)',
    transition: '0.5s',
    opacity: 0,
    color: theme.palette.primary.main,
  },
}))
function CardGlass({
  title, image, describe, cover, companyId,
}) {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Box className={classes.card} onClick={() => navigate(`/company/${companyId}`)}>
      {/* <Box className={classes.imgBx}> */}
      <img src={image} alt="company" />
      {/* </Box> */}
      <Box className={classes.content}>
        <Box className={classes.contentBx}>
          <Typography
            className={classes.text}
            sx={{ fontSize: '18px', textTransform: 'uppercase', fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <Typography
            className={classes.text}
            sx={{ fontSize: '14px' }}
          >
            {_startCase(describe)}
          </Typography>
        </Box>
        <Box className={classes.sci}>
          <Box className={classes.sciChild}><FacebookOutlinedIcon /></Box>
          <Box className={classes.sciChild}><LocationOnOutlinedIcon /></Box>
          <Box className={classes.sciChild}><LanguageIcon /></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CardGlass
CardGlass.propTypes = {
  title: PropTypes.string,
  describe: PropTypes.string,
  image: PropTypes.string,
  cover: PropTypes.string,
  companyId: PropTypes.string,
}
CardGlass.defaultProps = {
  title: '',
  describe: '',
  image: '',
  cover: '',
  companyId: '',
}
