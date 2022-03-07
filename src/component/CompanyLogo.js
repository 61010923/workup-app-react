import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '7rem',
    height: '7rem',
    // objectFit: 'cover',
    borderRadius: '20px',
    boxShadow: '0 0 4px 2px #939393',

  },
})
function CompanyLogo({ data }) {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <img src={data.imgProfile} alt="logo" className={classes.logo} />
      <Box sx={{
        display: 'flex', flexDirection: 'column', ml: 2,
      }}
      >
        <Typography variant="h6">
          {data.companyName}
        </Typography>
        <Link
          href="/#"
          color="rgb(202 162 47)"
          sx={{ textDecoration: 'none' }}
        >
          See more company details.
        </Link>
      </Box>

    </Box>
  )
}

export default CompanyLogo
CompanyLogo.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
}
CompanyLogo.defaultProps = {
  data: [],
}
