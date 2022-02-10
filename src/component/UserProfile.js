import React from 'react'
import { Box, Avatar, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '2rem',
    height: '10rem',
    // alignItems: 'center',
  },
  Avatar: {
    position: 'relative',
    // display: 'flex',
    // alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    top: '-2.5rem',
    left: '3.5rem',
  },
  email: {
    color: 'blue',
  },
})
function UserProfile() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.Avatar}>
        <Avatar
          alt="Remy Sharp"
          src="https://i.pinimg.com/564x/03/5b/fa/035bfa853b2865e4c31d541e46ed9f71.jpg"
          sx={{ width: 100, height: 100 }}
        />
        <IconButton className={classes.iconButton} color="primary" aria-label="add an alarm">
          <EditIcon sx={{ width: 40, height: 40 }} />
        </IconButton>
      </Box>
      <Box sx={{
        display: 'flex', flexDirection: 'column', ml: 10, mt: 3.2,
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
