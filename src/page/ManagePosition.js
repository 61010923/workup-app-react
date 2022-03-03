import React from 'react'
import {
  Box, Typography,
  Button, Modal,
  IconButton, TextField,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles({

})
const styleModal = {
  display: 'flex',
  justifyContent: 'center',
  bgcolor: 'background.paper',
  boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',
  p: 4,
  borderRadius: 2,

}
function AddPosition() {
  const classes = useStyles()
  return (
    <Box sx={{
      margin: ' 2rem 5rem',
    }}
    >
      <Box sx={styleModal}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>
            Manage Position
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            required
            id="demo-helper-text-aligned"
            label="ตำแหน่ง"
            autoComplete="off"
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            required
            type="number"
            id="demo-helper-text-aligned"
            label="อัตราที่รับ"
            autoComplete="off"
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            required
            type="number"
            id="demo-helper-text-aligned"
            label="เงินเดือน"
            autoComplete="off"
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            id="outlined-multiline-static"
            label="หน้าที่และรายละเอียดของงาน"
            multiline
            rows={5}
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            id="outlined-multiline-static"
            label="สถานที่ปฏิบัติงาน"
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            id="outlined-multiline-static"
            label="คุณสมบัติผู้สมัคร"
            multiline
            rows={3}
            fullWidth
          />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="Online Interview" control={<Radio />} label="Online Interview" />
              <FormControlLabel value="On-site interview" control={<Radio />} label="On-site interview" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" fullWidth color="success">
            เพิ่มตำแหน่งงาน
          </Button>
        </Box>
      </Box>
    </Box>

  )
}

export default AddPosition
