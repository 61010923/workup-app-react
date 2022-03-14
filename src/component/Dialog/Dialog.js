import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function CustomDialog(props) {
  const {
    children, onClose, title, open, btLabel, submitFunc, ...other
  } = props
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        {...other}
      >
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              // color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={submitFunc}>{btLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
CustomDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  btLabel: PropTypes.string,
  open: PropTypes.bool.isRequired,
  submitFunc: PropTypes.func,
}

CustomDialog.defaultProps = {
  btLabel: 'Save',
  submitFunc: () => {},
}
