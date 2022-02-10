import * as React from 'react'
import {
  Box, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { useEffect } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
  const handleChange = (event) => {
    setMarital(event.target.value)
  }
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  //   const fileInputRef = useRef()

  //   const fetchProvinceData = async () => {
  //     const res = await fetch('https://raw.githubusercontent.com/earthchie/jquery.Thailand.js/master/jquery.Thailand.js/database/raw_database/raw_database.json')
  //     res
  //       .json()
  //       .then((data) => setProvince(data))
  //       .catch((err) => console.log(err))
  //   }
  //   useEffect(() => {
  //     fetchProvinceData()
  //   }, [])
  //   console.log(province)
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
        {/* <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl> */}
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

      <label htmlFor="contained-button-file">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
        />
        <Button sx={{ mt: 1 }} variant="outlined" color="primary" fullWidth component="span" endIcon={<CloudUploadIcon />}>
          Upload RESUME
        </Button>
      </label>
      <Button sx={{ mt: 1 }} fullWidth variant="contained">save</Button>

    </Box>
  )
}
export default PersonalTab
