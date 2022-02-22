import * as React from 'react'
import {
  Box, Typography,
  Button, Modal, Avatar,
  IconButton, TextField,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import CloseIcon from '@mui/icons-material/Close'
import ImageListSkill from './ImageListSkill'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  overflow: 'auto',
}
export default function BasicButtonGroup() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined inherit button group">
        <Button color="info" onClick={handleOpen} variant="contained" startIcon={<HelpOutlineOutlinedIcon />}>
          INFO
        </Button>
        <Button color="error" variant="contained" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Avatar
            align="center"
            alt="Remy Sharp"
            src="https://c.tenor.com/WtOACVfD2h8AAAAC/dwinterlude-dog.gif"
            sx={{
              width: 100,
              height: 100,
              m: '0 auto',
              mb: 2,
            }}
          />

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(27rem, 1fr))',
            gridGap: '1rem',
          }}
          >
            <Box>
              <Box
                sx={{
                  width: '100%',
                  height: '2.5rem',
                  backgroundColor: '#2A9D8F',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{

                    fontWeight: 'bold',
                    color: '#fff',
                    p: 1,

                  }}
                >
                  INFORMATION
                </Typography>
              </Box>
              <Box sx={{
                padding: '0 8px',
              }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '5rem', fontWeight: 'bold' }}>
                      Name:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    Vanakorn Inyai
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '5rem', fontWeight: 'bold' }}>
                      Birthday:
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ overflow: 'hidden' }}>
                    31/08/2542
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '5rem', fontWeight: 'bold' }}>
                      Gender:
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ overflow: 'hidden' }}>
                    Male
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '5rem', fontWeight: 'bold' }}>
                      Address:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    17/4 Village No.5 Bamroongrat Road, Pibulsongkram Sub-district, Muang District, Bangkok, 10400
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  width: '100%',
                  height: '2.5rem',
                  backgroundColor: '#E76F51',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{

                    fontWeight: 'bold',
                    color: '#fff',
                    p: 1,

                  }}
                >
                  Education
                </Typography>
              </Box>
              <Box sx={{
                padding: '0 8px',
              }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '10rem', fontWeight: 'bold' }}>
                      Education:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    Bachelor&apos;s Degree
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '10rem', fontWeight: 'bold' }}>
                      University/School:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    king mongkut&apos;s institute of technology ladkrabang
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  width: '100%',
                  height: '2.5rem',
                  backgroundColor: '#E9C46A',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{

                    fontWeight: 'bold',
                    color: '#fff',
                    p: 1,

                  }}
                >
                  งานที่สนใจ
                </Typography>
              </Box>
              <Box sx={{
                padding: '0 8px',
              }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '10rem', fontWeight: 'bold' }}>
                      Position:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    Project Manager
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '10rem', fontWeight: 'bold' }}>
                      ลักษณะงานที่สนใจ:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    ไม่ทำงานแล้วได้เงิน ไม่หยุดที่จะนอน
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  width: '100%',
                  height: '2.5rem',
                  backgroundColor: '#F4A261',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{

                    fontWeight: 'bold',
                    color: '#fff',
                    p: 1,

                  }}
                >
                  Skill/Past work
                </Typography>
              </Box>
              <Box sx={{
                padding: '0 8px',
              }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '6rem', fontWeight: 'bold' }}>
                      Skill:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    นอน กิน เล่น
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <Typography sx={{ width: '6rem', fontWeight: 'bold' }}>
                      Past work:
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ overflow: 'hidden' }}
                  >
                    ช่วยแม่ถูบ้าน
                  </Typography>
                </Box>
                <ImageListSkill />
              </Box>
            </Box>

          </Box>
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
