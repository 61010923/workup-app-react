import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

function ButtonAddPosition() {
  const history = useNavigate()

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // padding: '1rem',
      position: 'relative',
    }}
    >
      <Typography
        variant="h6"
        color="primary"
      >
        จัดการตำแหน่งงาน
      </Typography>
      <Button onClick={() => { history('/managePosition') }} variant="text" color="success" size="large" startIcon={<AddIcon sx={{ fontSize: 40 }} />}>
        เพิ่มตำแหน่งงาน
      </Button>
    </Box>
  )
}

export default ButtonAddPosition
