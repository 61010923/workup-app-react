import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'
import sony from '../image/sony.png'

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
    border: '2px solid #3333',
  },
})
function CompanyLogo() {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <img src={sony} alt="logo" className={classes.logo} />
      <Box sx={{
        display: 'flex', flexDirection: 'column', ml: 2,
      }}
      >
        <Typography variant="h6">
          Sony Technology (Thailand) Co., Ltd.
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
