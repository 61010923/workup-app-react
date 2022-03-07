import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import PersonIcon from '@mui/icons-material/Person'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import useMediaQuery from '@mui/material/useMediaQuery'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import BusinessIcon from '@mui/icons-material/Business'
import _get from 'lodash/get'
import sony from '../image/sony.png'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgb(248 248 248)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 0 8px 2px #939393',

  },
  dateBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  careerItems: {
    display: 'flex',
    alignItems: 'center',
    width: '25%',
    // backgroundColor: 'red',
    margin: '5px',
  },
  careerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10rem',
    // backgroundColor: 'red',
    margin: '5px',
    padding: '5px',
    backgroundColor: 'orange',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
    color: '#fff',
    borderRadius: '8px',
  },
  careerDes: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
  },
  locationWrapper: {
    display: 'flex',
  },
})
function CareerAbout({ data }) {
  const classes = useStyles()
  const mediaQuery = useMediaQuery('(min-width:600px)')
  return (
    <Box className={classes.container}>
      <Box className={classes.dateBox}>
        <Typography variant="body2">
          {_get(data, 'createdAt')}

        </Typography>
      </Box>
      <Typography variant="h6">
        {data?.position}
      </Typography>
      <Box className={classes.locationWrapper}>
        <Box className={classes.careerItems}>
          <LocationOnIcon />
          <Typography variant="body2" style={{ display: mediaQuery ? 'inline-block' : 'none' }}>
            Location
          </Typography>
        </Box>
        <Box className={classes.careerDes}>
          <Typography variant="body2">
            {data?.location}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.locationWrapper}>
        <Box className={classes.careerItems}>
          <PaidIcon />
          <Typography variant="body2">
            Salary
          </Typography>
        </Box>
        <Box className={classes.careerDes}>
          <Typography variant="body2">
            {data?.salary}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.locationWrapper}>
        <Box className={classes.careerItems}>
          <PersonIcon />
          <Typography variant="body2">
            Vacancies
          </Typography>
        </Box>
        <Box className={classes.careerDes}>
          <Typography variant="body2">
            {data?.positionTotal}
            {' '}
            positions
          </Typography>
        </Box>
      </Box>
      <Box className={classes.careerBox}>
        {data?.interview === 'Online Interview'
          ? (
            <HeadsetMicIcon />

          ) : (
            <BusinessIcon />

          )}
        <Typography variant="body2">
          {data?.interview}
        </Typography>
      </Box>
      <Box className={classes.dateBox}>
        <Button
          style={{
            maxWidth: '300px', minWidth: '100px',
          }}
          variant="contained"
          endIcon={<EmailIcon />}
        >
          Sent Email
        </Button>
        <Button
          style={{
            maxWidth: '300px', minWidth: '100px', marginLeft: '13px',
          }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Apply Now
        </Button>

      </Box>
    </Box>

  )
}

export default CareerAbout
CareerAbout.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
}
CareerAbout.defaultProps = {
  data: [],
}
