import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function BasicButtonGroup() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined inherit button group">
      <Button color="info" variant="contained" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button color="error" variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </ButtonGroup>
  )
}
