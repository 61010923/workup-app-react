import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import sony from '../image/sony.png'

const useStyles = makeStyles({

  CompaniesItem: {
    width: '20rem',
    margin: '8px',
    padding: '8px',
    borderRadius: '8px',
    border: '2px solid #40404059',
    cursor: 'pointer',
    transition: 'transform 1s',
    backgroundColor: '#4040400a',

    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#40404059',
    },
  },
  careerItems: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: 'red',
    margin: '4px',
  },
})
function CareerSuggest() {
  const classes = useStyles()

  return (
    <Box className={classes.CompaniesItem}>
      <Typography variant="h6">
        product Design Engineer
      </Typography>
      <Box className={classes.careerItems}>
        <LocationOnIcon />
        <Typography variant="body2">
          Amata City Chonburi Industrial Estate Chon Buri
        </Typography>
      </Box>
      <Box className={classes.careerItems}>
        <PaidIcon />
        <Typography variant="body2">
          Company structure
        </Typography>
      </Box>
    </Box>
  )
}

export default CareerSuggest
