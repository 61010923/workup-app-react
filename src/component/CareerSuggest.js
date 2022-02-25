import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import { collapseClasses } from '@mui/material'
import sony from '../image/sony.png'

const useStyles = makeStyles({

  CompaniesItem: {
    width: '19rem',
    height: '9rem',
    margin: '8px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '3px 5px 8px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: '0.5rem',
      backgroundColor: 'orange',
      transition: '0.5s',
    },
    '&:hover::before': {
      width: '100%',
    },
    '&:hover': {
      color: '#fff',
      '& $changeColor': {
        color: '#fff',
      },
    },
    '& $changeColor': {
      color: 'orange',
    },
  },
  changeColor: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    transition: '0.5s',

  },
  careerItems: {
    display: 'flex',
    alignItems: 'center',
    // margin: '4px',
  },
})
function CareerSuggest() {
  const classes = useStyles()

  return (
    <Box className={classes.CompaniesItem}>
      <Box
        sx={{
          padding: 1,
          ml: 1,
          zIndex: '1',
          transition: '0.5s',
        }}
      >
        <changeColor className={classes.changeColor}>
          Product Design Engineer
        </changeColor>
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
    </Box>
  )
}

export default CareerSuggest
