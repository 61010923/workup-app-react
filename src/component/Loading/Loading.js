import React from 'react'
import Lottie from 'lottie-react-web'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import loading from './loading.json'

const useStyles = makeStyles({
  container: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
})
function Loading() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box display="flex" flexDirection="column">
        <Lottie options={{ animationData: loading, loop: true }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        />
      </Box>
    </Box>

  )
}

export default Loading
