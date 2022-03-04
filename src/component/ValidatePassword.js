import React from 'react'
import {
  Box, Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function ValidatePassword({ password }) {
  function validatePassword(pw) {
    // eslint-disable-next-line no-new-object
    const checkPassword = new Object()
    checkPassword.upper = /[A-Z]/.test(pw)
    checkPassword.lower = /[a-z]/.test(pw)
    checkPassword.number = /[0-9]/.test(pw)
    checkPassword.length = pw.length > 8
    return checkPassword
  }
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )' }}
    >
      {validatePassword(password).upper
        ? (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: 'green',
          }}
          >
            <CheckCircleIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              A capital (uppercase) letter
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: '#D32F2E',
          }}
          >
            <CancelIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              A capital (uppercase) letter
            </Typography>
          </Box>
        )}
      {validatePassword(password).lower
        ? (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: 'green',
          }}
          >
            <CheckCircleIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              A lowercase letter
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: '#D32F2E',
          }}
          >
            <CancelIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              A lowercase letter
            </Typography>
          </Box>
        )}
      {validatePassword(password).number
        ? (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: 'green',
          }}
          >
            <CheckCircleIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              A number
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: '#D32F2E',
          }}
          >
            <CancelIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              A number
            </Typography>
          </Box>
        )}
      {validatePassword(password).length
        ? (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: 'green',
          }}
          >
            <CheckCircleIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              Minimum 8 characters
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '3px 14px 0',
            color: '#D32F2E',
          }}
          >
            <CancelIcon sx={{ fontSize: '20px' }} />
            <Typography sx={{
              fontSize: '13.7px', ml: 0.5,
            }}
            >
              Minimum 8 characters
            </Typography>
          </Box>
        )}
    </Box>
  )
}

export default ValidatePassword
ValidatePassword.propTypes = {
  password: PropTypes.string.isRequired,
}
