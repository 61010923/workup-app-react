import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import UserProfile from '../component/UserProfile'
import UserForm from '../component/UserForm'
import userDetail from '../redux/selector/user.selector'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    margin: '2rem 5rem',
    justifyContent: 'center',
    flexDirection: 'column',
  },

})
function User() {
  const classes = useStyles()
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const [allData, setAllData] = useState({})

  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/userProfile/getUserProfile`,
        {
          headers: {
            authorization: userToken,
          },
        },
      )
      if (response.status === 200 || response.status === 201) {
        setAllData(_get(response, 'data.data'))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box className={classes.container}>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)', borderRadius: 2, display: 'flex', justifyContent: 'center',
      }}
      >
        <UserProfile data={allData} />
      </Box>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)', borderRadius: 2, mt: 2,
      }}
      >
        <UserForm data={allData} />
      </Box>
    </Box>

  )
}

export default User
