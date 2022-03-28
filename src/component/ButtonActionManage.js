import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import _get from 'lodash/get'

export default function BasicButtonGroup({
  buttonText, icon, path, data, deleteFunc, disable,
}) {
  const history = useNavigate()
  return (
    <ButtonGroup variant="contained" aria-label="outlined inherit button group">
      <Button color="info" onClick={() => { history(path, { state: data }) }} variant="contained" startIcon={icon}>
        {buttonText}
      </Button>
      <Button
        key={_get(data, '_id')}
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() => deleteFunc(_get(data, '_id'))}
        disabled={disable}
      >
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
  deleteFunc: PropTypes.func,
  disable: PropTypes.bool,

}
BasicButtonGroup.defaultProps = {
  data: [],
  buttonText: '',
  icon: <QuestionMarkIcon />,
  path: '/',
  deleteFunc: () => {},
  disable: false,
}
