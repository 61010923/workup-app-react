import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import { collapseClasses } from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

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
      backgroundColor: theme.palette.primary.medium,
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
  },
  changeColor: {
    color: theme.palette.primary.medium,
    transition: '0.5s',

  },
  careerItems: {
    display: 'flex',
    alignItems: 'center',
    // margin: '4px',
  },
}))
function CareerSuggest({ data }) {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <Box
      className={classes.CompaniesItem}
      onClick={() => navigate(`/companyCareer/${data.id}`)}
    >
      <Box
        sx={{
          padding: 1,
          ml: 2,
          zIndex: '1',
          transition: '0.5s',
        }}
      >
        <Typography
          className={classes.changeColor}
          sx={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            transition: '0.5s',
            textTransform: 'capitalize',
          }}
        >
          {data.position}
        </Typography>
        <Box className={classes.careerItems}>
          <LocationOnIcon />
          <Typography variant="body2">
            {data.location}
          </Typography>
        </Box>
        <Box className={classes.careerItems}>
          <PaidIcon />
          <Typography variant="body2">
            {data.salary}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CareerSuggest
CareerSuggest.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
}
CareerSuggest.defaultProps = {
  data: [],
}
