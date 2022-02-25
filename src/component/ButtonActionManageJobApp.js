import * as React from 'react'
import {
  Box, Typography,
  Button,
} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { useNavigate } from 'react-router-dom'

export default function BasicButtonGroup() {
  const history = useNavigate()
  return (
    <ButtonGroup variant="contained" aria-label="outlined inherit button group">
      <Button color="info" onClick={() => history('/InfoUser')} variant="contained" startIcon={<HelpOutlineOutlinedIcon />}>
        INFO
      </Button>
      <Button color="error" variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </ButtonGroup>
  )
}
