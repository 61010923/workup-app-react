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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  //   borderRadius: 2,
  p: 4,
  overflow: 'auto',
}
function AddPosition() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        position: 'relative',
      }}
      >
        <Typography variant="h6">
          จัดการตำแหน่งงาน
        </Typography>
        <Button onClick={handleOpen} variant="contained" color="success" startIcon={<AddIcon sx={{ fontSize: 40 }} />}>
          เพิ่มตำแหน่งงาน
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
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
              <FormControlLabel value="interview" control={<Radio />} label="สัมภาษณ์งานออนไลน์ (Online Interview)" />
              <FormControlLabel value="onSite" control={<Radio />} label="on-site interview" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" fullWidth color="success">
            เพิ่มตำแหน่งงาน
          </Button>
          <IconButton
            sx={{
              color: 'primary',
              position: 'absolute',
              right: '0',
              top: '0',
            }}
            aria-label="add an alarm"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>

      </Modal>
    </>

  )
}

export default AddPosition
