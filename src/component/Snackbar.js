import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SnackBar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Proptypes from 'prop-types'
import { clearMessage } from '../redux/action/alert.action'

function Snackbar(props) {
  const {
    timeduration, message, open: snackOpen, type,
  } = props
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const position = {
    vertical: 'top',
    horizontal: 'center',
  }
  const handleClose = () => {
    setOpen(false)
    dispatch(clearMessage())
  }
  useEffect(() => {
    setOpen(snackOpen)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackOpen])
  return (
    <SnackBar
      open={open}
      autoHideDuration={timeduration}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert severity={type} variant="filled" sx={{ maxWidth: '600px', minWidth: '200px' }}>
        {message}
      </Alert>

    </SnackBar>
  )
}

export default Snackbar

Snackbar.propTypes = {
  timeduration: Proptypes.number,
  message: Proptypes.string.isRequired,
  open: Proptypes.bool,
  type: Proptypes.string.isRequired,
}
Snackbar.defaultProps = {
  timeduration: 3000,
  open: false,
}
