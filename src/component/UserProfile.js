import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
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
function UserProfile({ data, state, setState }) {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <AvatarPhoto profile={data.imgProfile} firstName={data.firstName} state={state} setState={setState} />
      <Box sx={{
        display: 'flex', flexDirection: 'column', ml: 8, mt: 4,
      }}
      >
        <Typography variant="h5">
          {`${data.firstName}\u00A0${data.lastName}`}
        </Typography>
        <Typography variant="body2">

          <span className={classes.email}>{data.email}</span>
          &nbsp;- member
        </Typography>

      </Box>
    </Box>
  )
}

export default UserProfile
UserProfile.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
}
