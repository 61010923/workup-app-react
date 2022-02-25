import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import PropTypes, { any } from 'prop-types'

export default function BasicButtonGroup() {
  const history = useNavigate()
  return (
    <ButtonGroup variant="contained" aria-label="outlined inherit button group">
      <Button color="info" onClick={() => { history('/managePosition') }} variant="contained" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button color="error" variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </ButtonGroup>
  )
}
