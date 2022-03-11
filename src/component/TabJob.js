import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  circleHover: {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    clipPath: 'circle(25px at 0 0)',
    transition: '1s ease-out',
  },
  urgentJobItems: {
    display: 'flex',
    margin: '16px',
    height: '5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    // borderRadius: '20px',
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.2)',
    position: 'relative',
    // overflow: 'hidden',
    '&::before': {
      content: '""',
      width: '15px',
      height: '100%',
      background: `linear-gradient(${theme.palette.primary.light},${theme.palette.primary.main})`,

      position: 'absolute',
      top: 0,
      Left: 0,
      transform: 'skewY(-45deg) translate(-24px,-17px)',
    },
    '&::after': {
      content: '""',
      width: '100%',
      height: '15px',
      background: `linear-gradient(${theme.palette.primary.light},${theme.palette.primary.main})`,
      position: 'absolute',
      bottom: 0,
      Left: 0,
      transform: 'skewX(-45deg) translate(0px,14px)',
    },
    '&:hover': {
      '& $circleHover': {
        clipPath: 'circle(1000px at 0 0)',
      },
    },

  },
  imageSetting: {
    minWidth: '5rem',
    height: '5rem',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))
function TabJob({
  companyName, positionId, imgProfile, position, salary,
}) {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <Box
      className={classes.urgentJobItems}
      onClick={() => navigate(`/companyCareer/${positionId}`)}
    >
      <Box className={classes.circleHover} />
      <Box>
        <Typography gutterBottom variant="h5" component="div">
          {companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`รับสมัคร ${position}`}
        </Typography>
      </Box>
      <Box className={classes.imageSetting}>
        <img alt="sony" src={imgProfile} />
      </Box>
    </Box>
  )
}

export default TabJob
TabJob.propTypes = {
  positionId: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  imgProfile: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
}
