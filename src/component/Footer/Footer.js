import React from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

function Footer(props) {
  const {
    submitFunc, cancelFunc, haveCancel, submitLabel, cancelLabel, loading,
  } = props
  return (
    <AppBar
      position="fixed"
      color="common"
      sx={{ top: 'auto', bottom: 0, height: '50px' }}
    >
      <Box height="100%" width="100%" display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="flex" justifyContent="space-evenly" alignItems="center" gap="8px" mr={2}>
          { haveCancel && (
          <Box>
            <Button
              sx={{ borderRadius: '4px' }}
              variant="outlined"
              size="small"
              fullWidth
              onClick={cancelFunc}
            >
              {cancelLabel}

            </Button>
          </Box>
          )}
          <Box>

            <Button
              sx={{ borderRadius: '4px' }}
              variant="contained"
              size="small"
              fullWidth
              disabled={loading}
              onClick={submitFunc}
            >
              {submitLabel}

            </Button>
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}

export default Footer

Footer.propTypes = {
  submitLabel: PropTypes.string,
  haveCancel: PropTypes.bool,
  cancelLabel: PropTypes.string,
  submitFunc: PropTypes.func,
  cancelFunc: PropTypes.func,
  loading: PropTypes.bool,
}

Footer.defaultProps = {
  submitLabel: 'save',
  cancelLabel: 'cancel',
  haveCancel: false,
  loading: false,
  submitFunc: () => {},
  cancelFunc: () => {},
}
