import React from 'react'
import { Box, Button, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import _startCase from 'lodash/startCase'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { useNavigate } from 'react-router-dom'
import AvatarPhoto from './AvatarPhoto'
import userDetail from '../redux/selector/user.selector'
import TypographyLoading from './Typography'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    color: 'blue',
  },
})
function UserProfile({
  loading, data, state, setState,
}) {
  const classes = useStyles()
  const navigate = useNavigate()
  const user = useSelector(userDetail)
  return (
    <Box className={classes.container}>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="circular"
          width={128}
          height={128}
        />
      ) : (
        <AvatarPhoto
          profile={data.imgProfile}
          firstName={data.firstName}
          state={state}
          setState={setState}
          actionType="edit"
        />
      )}
      <Box
        mt={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box>
            <TypographyLoading
              heightSkeleton={20}
              loading={loading}
              variant="h5"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {_startCase(data.firstName)}
            </TypographyLoading>
          </Box>
          <Box>
            <TypographyLoading
              heightSkeleton={20}
              loading={loading}
              variant="h5"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {_startCase(data.lastName)}
            </TypographyLoading>
          </Box>
          <Box mt={1}>
            <TypographyLoading
              heightSkeleton={20}
              loading={loading}
              variant="body1"
              color="primary"
            >
              {data.responsible}
            </TypographyLoading>
          </Box>
        </Box>
        {/* <Box mt={2}>
          <TypographyLoading
            heightSkeleton={20}
            loading={loading}
            variant="body1"
          >
            <span className={classes.email}>{data.emailAuth}</span>
          &nbsp;-
            {' '}
            {user.userDetail.userType}
          </TypographyLoading>
        </Box> */}
        <Box mt={2}>
          <Button
            onClick={() => navigate(`/${user.userDetail.userType}Account`)}
            startIcon={<ManageAccountsOutlinedIcon />}
            variant="outlined"
            color="info"
            size="small"
            sx={{ borderRadius: '1rem', width: '100%', mt: 1 }}
          >
            Change password
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UserProfile
UserProfile.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}
