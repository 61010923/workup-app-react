import * as React from 'react'
import {
  Box, Button, TextField, MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { useEffect } from 'react'
import ImageUploader from './ImageUploader'

const useStyles = makeStyles({
  container: {
    width: '75%',
    margin: '0 auto',
  },
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
})

function PersonalTab() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          required
          id="demo-helper-text-aligned"
          label="Fist Name"
          autoComplete="off"
          fullWidth
        />
        <TextField
          sx={{ ml: 1 }}
          required
          id="demo-helper-text-aligned"
          label="Last Name"
          autoComplete="off"
          fullWidth
        />
      </Box>
      <TextField
        sx={{ mt: 2 }}
        required
        id="demo-helper-text-aligned"
        label="Company Name"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-multiline-static"
        label="รายละเอียดเกี่ยวกับบริษัทและการดำเนินกิจการ"
        multiline
        rows={5}
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-multiline-static"
        label="สวัสดิการ"
        multiline
        rows={3}
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-multiline-static"
        label="วิธีการสมัคร"
        multiline
        rows={3}
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-multiline-static"
        label="ที่อยู่"
        multiline
        rows={3}
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        type="number"
        className={classes.input}
        // onInput={(e) => {
        //   e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 10)
        // }}
        required
        id="demo-helper-text-aligned"
        label="โทรศัพท์"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        required
        id="demo-helper-text-aligned"
        label="อีเมลติดต่อ"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-multiline-static"
        label="การเดินทาง"
        multiline
        rows={3}
        fullWidth
      />
      <Button sx={{ mt: 2 }} fullWidth variant="contained">save</Button>

    </Box>
  )
}
export default PersonalTab
