import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

function Textfield(props) {
  const { loading } = props

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Skeleton variant="text" sx={{ paddingTop: '0' }} width="100%" height={40} />
      )
        : (<TextField {...props} />
        )}
    </>
  )
}

export default Textfield

Textfield.propTypes = {
  loading: PropTypes.bool,
}

Textfield.defaultProps = {
  loading: false,
}
