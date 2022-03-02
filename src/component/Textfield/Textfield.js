import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

function Textfield(props) {
  const { loading, height } = props

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Skeleton variant="text" width="100%" sx={{ paddingTop: '0' }} height={height} />
      )
        : (<TextField {...props} />
        )}
    </>
  )
}

export default Textfield

Textfield.propTypes = {
  loading: PropTypes.bool,
  height: PropTypes.number,
}

Textfield.defaultProps = {
  loading: false,
  height: 56,
}
