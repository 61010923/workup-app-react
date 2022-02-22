import React from 'react'
import { Box, Button } from '@mui/material'
import Lottie from 'lottie-react-web'
import Animation from '../lotties/404.json'

function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '-webkit-linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)',
        minHeight: '100vh',
      }}
    >
      <Box width={500}>
        <Lottie
          options={defaultOptions}
          height={500}
        />
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>GO BACK TO OUR HOMEPAGE</Button>
      </Box>
    </Box>
  )
}

export default NotFound
