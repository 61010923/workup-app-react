import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

function TypographyText(props) {
  const { loading, heightSkeleton } = props

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Skeleton variant="text" sx={{ paddingTop: '0' }} width="100%" height={heightSkeleton} />
      )
        : (<Typography {...props} />
        )}
    </>
  )
}

export default TypographyText

TypographyText.propTypes = {
  loading: PropTypes.bool,
  heightSkeleton: PropTypes.number,
}

TypographyText.defaultProps = {
  loading: false,
  heightSkeleton: 40,
}
