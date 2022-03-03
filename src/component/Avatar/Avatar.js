import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

function AvatarLoading(props) {
  const { loading, heightSkeleton, widthSkeleton } = props

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Skeleton variant="circular" width={widthSkeleton} height={heightSkeleton} />
      )
        : (<Avatar {...props} />
        )}
    </>
  )
}

export default AvatarLoading

AvatarLoading.propTypes = {
  loading: PropTypes.bool,
  heightSkeleton: PropTypes.number,
  widthSkeleton: PropTypes.number,
}

AvatarLoading.defaultProps = {
  loading: false,
  heightSkeleton: 40,
  widthSkeleton: 40,
}
