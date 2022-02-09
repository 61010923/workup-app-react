import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import sony from '../image/sony.png'

const useStyles = makeStyles({

  positionItems: {

    // margin: '8px 16px',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '2px solid rgb(242, 242, 242)',
    padding: '16px',
    cursor: 'pointer',
    transition: '0.5s',
    '&:hover': {
      backgroundColor: 'rgb(240, 240, 240)',

    },
  },
  numbers: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  careerItems: {
    display: 'flex',
    alignItems: 'center',
    width: '25%',
    // backgroundColor: 'red',
    margin: '4px',
  },
  locationWrapper: {
    display: 'flex',
  },
})
function CareerTitle() {
  const classes = useStyles()

  return (
    <Box className={classes.positionItems}>
      <Box className={classes.numbers}>
        <Typography variant="body2">
          1.
        </Typography>
        <Typography variant="body2">
          Feb 3, 2022
        </Typography>
      </Box>
      <Typography variant="h6">
        Software Engineer
      </Typography>
      <Box className={classes.locationWrapper}>
        <Box className={classes.careerItems}>
          <LocationOnIcon />
          <Typography variant="body2">
            bangkok
          </Typography>
        </Box>
        <Box className={classes.careerItems}>
          <PaidIcon />
          <Typography variant="body2">
            company structure
          </Typography>
        </Box>
      </Box>
      <Box className={classes.careerItems}>
        <HeadsetMicIcon />
        <Typography variant="body2">
          Online interview
        </Typography>
      </Box>
    </Box>
  )
}

export default CareerTitle
