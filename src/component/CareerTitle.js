import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import BusinessIcon from '@mui/icons-material/Business'

const useStyles = makeStyles((theme) => ({
  positionItems: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '2px solid rgb(242, 242, 242)',
    padding: '16px',
    cursor: 'pointer',
    transition: '0.5s',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.5s',
      borderRadius: '4px',

    },
    // borderRadius: '4px',
    '&:hover::before': {
      transform: 'scaleX(1)',
      transformOrigin: 'left',
      // borderRadius: '4px',
      transition: 'transform 0.5s',
    },
    '&:hover': {
      // borderRadius: '4px',
      color: '#fff',
      '& $changeColor': {
        color: '#fff',
      },
      '&::before': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
        transition: 'transform 0.5s',
      },
    },
    '& $changeColor': {
      color: theme.palette.primary.main,
    },
  },
  changeColor: {
    transition: '0.5s',
    zIndex: '1',
    textDecoration: 'underline',
  },
  numbers: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  careerItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
}))
function CareerTitle(props) {
  const classes = useStyles()
  const navigate = useNavigate()
  const {
    date, location, salary, interview, position, positionId,
  } = props
  return (
    <Box
      className={classes.positionItems}
      onClick={() => navigate(`/companyCareer/${positionId}`)}
    >
      <Box className={classes.numbers} sx={{ zIndex: 1 }}>
        <Typography variant="body2">{date}</Typography>
      </Box>
      <Box mt={1} className={classes.changeColor}>
        <Typography variant="h6">{position}</Typography>
      </Box>
      <Grid
        container
        width="80%"
        mt={1}
        spacing={1}
        className={classes.changeColor}
        sx={{ textDecoration: 'none', color: 'black' }}
      >
        <Grid item md={6} xs={12}>
          <Box className={classes.careerItems}>
            <LocationOnIcon />
            <Typography variant="body2">{location}</Typography>
          </Box>

        </Grid>
        <Grid item md={6} xs={12}>
          <Box className={classes.careerItems}>
            <PaidIcon />
            <Typography variant="body2">{salary}</Typography>
          </Box>

        </Grid>
        <Grid item md={6} xs={12}>
          <Box className={classes.careerItems} sx={{ zIndex: 1 }}>
            {interview === 'Online Interview' ? (
              <HeadsetMicIcon />

            ) : (
              <BusinessIcon />
            )}
            <Typography variant="body2">{interview}</Typography>
          </Box>

        </Grid>
        {/* <Box className={classes.locationWrapper} sx={{ zIndex: 1 }} mt={1}> */}
        {/* </Box> */}
      </Grid>
    </Box>
  )
}

export default CareerTitle

CareerTitle.propTypes = {
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  interview: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  positionId: PropTypes.string.isRequired,
}
