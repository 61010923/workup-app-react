import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

export default function BasicButtonGroup({
  buttonText, icon, path, data,
}) {
  const history = useNavigate()
  return (
    <ButtonGroup variant="contained" aria-label="outlined inherit button group">
      <Button color="info" onClick={() => { history(path, { state: data }) }} variant="contained" startIcon={icon}>
        {buttonText}
      </Button>
      <Button color="error" variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </ButtonGroup>
  )
}

BasicButtonGroup.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  buttonText: PropTypes.string,
  icon: PropTypes.element,
  path: PropTypes.string,

}
BasicButtonGroup.defaultProps = {
  data: [],
  buttonText: '',
  icon: <QuestionMarkIcon />,
  path: '/',
}
