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

function AccountTab() {
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

  return (
    <Box className={classes.container}>
      <TextField
        required
        id="demo-helper-text-aligned"
        label="Email"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        required
        id="demo-helper-text-aligned"
        label="Old Password"
        type="password"
        autoComplete="off"
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        required
        id="demo-helper-text-aligned"
        label="New Password"
        type="password"
        autoComplete="off"
        fullWidth
      />

      <Button sx={{ mt: 2 }} fullWidth variant="contained">save</Button>

    </Box>
  )
}
export default AccountTab
