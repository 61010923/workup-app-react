import React, { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Textfield from '../../component/Textfield'
import Profile from '../../component/CompanyProfile'

const useStyles = makeStyles({
  container: {
    width: '75%',
    margin: '0 auto',
  },
})
function CompanyProfile() {
  const classes = useStyles()
  return (
    <>
      <Box
        sx={{
          border: '3px solid #F5F5F5 ',
          borderRadius: '4px',
        }}
      >
        <Profile />
      </Box>
      <Box>
        <Box className={classes.container}>
          <Box mt={3}>
            <Textfield
              required
              label="Company Name"
              fullWidth
              // loading
            />
          </Box>
          <Box mt={2}>
            <Textfield
              label="รายละเอียดเกี่ยวกับบริษัทและการดำเนินกิจการ"
              multiline
              rows={5}
              fullWidth
              // loading
              height={112}
            />
          </Box>
          <Box mt={2}>
            <Textfield
              label="สวัสดิการ"
              multiline
              rows={3}
              fullWidth
              // loading
              height={112}
            />
          </Box>
          <Box mt={2}>
            {/* <Textfield label="วิธีการสมัคร" multiline rows={3} fullWidth loading height={112} /> */}
          </Box>
          <Box mt={2}>
            <Textfield
              id="outlined-multiline-static"
              label="ที่อยู่"
              multiline
              rows={3}
              fullWidth
              // loading
              height={112}
            />
          </Box>
          <Box mt={2}>
            <Textfield
              type="number"
              className={classes.input}
              // loading
              required
              id="demo-helper-text-aligned"
              label="โทรศัพท์"
              autoComplete="off"
              fullWidth
            />
          </Box>
          <Box mt={2}>
            <Textfield
              sx={{ mt: 2 }}
              required
              id="demo-helper-text-aligned"
              label="อีเมลติดต่อ"
              autoComplete="off"
              fullWidth
              // loading
            />
          </Box>
          <Box mt={2}>
            <Textfield
              sx={{ mt: 2 }}
              id="outlined-multiline-static"
              label="การเดินทาง"
              multiline
              rows={3}
              fullWidth
              // loading
              height={112}
            />
          </Box>
          <Button sx={{ mt: 2 }} fullWidth variant="contained">
            save
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CompanyProfile
