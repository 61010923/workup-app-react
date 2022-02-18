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
})
const Maritals = [
  {
    value: 'โสด',
  },
  {
    value: 'สมรส',
  },
  {
    value: 'หย่า',
  },
  {
    value: 'หม้าย',
  },
  {
    value: 'หย่า',
  },
]
const genders = [
  {
    value: 'ชาย',
  },
  {
    value: 'หญิง',
  },
  {
    value: 'ไม่ระบุ',
  },

]

function PersonalTab() {
  const classes = useStyles()
  const [value, setValue] = React.useState(null)
  const [marital, setMarital] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [province, setProvince] = React.useState('')
  const [image, setImage] = React.useState(null)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }
  const handleChange = (event) => {
    setMarital(event.target.value)
  }
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  return (
    <Box className={classes.container}>
      <TextField
        required
        id="demo-helper-text-aligned"
        label="Email"
        autoComplete="off"
        fullWidth
      />
      <Box sx={{ mt: 1, display: 'flex' }}>
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          fullWidth
          label="Birthday"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 1 }} />}
        />
      </LocalizationProvider>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          id="outlined-select-currency"
          select
          label="Gender"
          value={gender}
          onChange={handleChangeGender}
        //   helperText="Please select your currency"
          fullWidth
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ ml: 1 }}
          id="outlined-select-currency"
          select
          label="Marital Status"
          value={marital}
          onChange={handleChange}
        //   helperText="Please select your currency"
          fullWidth
        >
          {Maritals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TextField
        sx={{ mt: 1 }}
        required
        id="demo-helper-text-aligned"
        label="ที่อยู่ปัจจุบัน"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 1 }}
        required
        id="demo-helper-text-aligned"
        label="ลักษณะงานที่สนใจ"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 1 }}
        id="outlined-multiline-static"
        label="ความสามารถ/ผลงาน"
        multiline
        rows={4}
        fullWidth
      />
      <ImageUploader />
      <Button sx={{ mt: 1 }} fullWidth variant="contained">save</Button>

    </Box>
  )
}
export default PersonalTab
