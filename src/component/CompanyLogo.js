import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import { Button, Link } from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import TypographyLoading from './Typography'
import AvatarLoading from './Avatar'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
})
function CompanyLogo({ data, loading }) {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <Box className={classes.container}>
      <Box
        sx={{ minWidth: '7rem', height: '7rem' }}
      >
        <AvatarLoading
          variantSkeleton="rectangular"
          widthSkeleton="7rem"
          heightSkeleton="7rem"
          variant="rounded"
          loading={loading}
          src={data.imgProfile}
          alt="logo"
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'column', ml: 2,
      }}
      >
        <TypographyLoading loading={loading} variant="h6">
          {data.companyName}
        </TypographyLoading>
        <Button
          variant="text"
          size="small"
          sx={{
            textTransform: 'capitalize',
            mt: 0.5,
          }}
          onClick={() => navigate(`/company/${data.companyId}`)}
        >
          See more company details.
        </Button>
      </Box>

    </Box>
  )
}

export default CompanyLogo
CompanyLogo.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
}
CompanyLogo.defaultProps = {
  data: [],
  loading: false,
}
