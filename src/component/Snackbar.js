import React, { useState, useEffect } from 'react'
import SnackBar from '@mui/material/Snackbar'
import Proptypes from 'prop-types'

function Snackbar(props) {
  const { timeduration, message } = props
  const [open, setOpen] = useState(true)

  const position = {
    vertical: 'top',
    horizontal: 'center',
  }
  const handleClose = () => {
    setOpen(false)
  }
  // useEffect(() => {
  //   setOpen(true)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <SnackBar
      open={open}
      autoHideDuration={timeduration}
      onClose={handleClose}
      anchorOrigin={position}
      message={message}
    />
  )
}

export default Snackbar

Snackbar.propTypes = {
  timeduration: Proptypes.number,
  message: Proptypes.string.isRequired,
}
Snackbar.defaultProps = {
  timeduration: 3000,
}
