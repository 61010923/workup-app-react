import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import AvatarPhoto from './AvatarPhoto'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '2rem',
    height: 'auto',
  },
  email: {
    color: 'blue',
  },
})
function UserProfile() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <AvatarPhoto />
      <Box sx={{
        display: 'flex', flexDirection: 'column', ml: 8, mt: 4,
      }}
      >
        <Typography variant="h5">
          Pug dog
        </Typography>
        <Typography variant="body2">

          <span className={classes.email}>Pugdog@gmail.com</span>
          &nbsp;- member
        </Typography>

      </Box>
    </Box>
  )
}

export default UserProfile
