import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box, Button, Avatar, Typography,
} from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import _get from 'lodash/get'
import axios from 'axios'
import TabPanel from '@mui/lab/TabPanel'
import { makeStyles } from '@mui/styles'
import userDetail from '../../redux/selector/user.selector'
import SignUp from '../../component/signUp'

const useStyles = makeStyles({
  container: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    // backgroundColor: 'red',

  },
  formWrapper: {
    position: 'relative',
    marginTop: '32px',
  },
  avatarWrapper: {
    position: 'absolute',
    top: '-75px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '999',
  },
  tabList: {
    color: '#fff',
  },
})
function SignInUp() {
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const [value, setValue] = useState('1')
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getImg = async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/userProfile/getImgProfile`, { email })
      if (response.status === 200) {
        setImg(_get(response, 'data.data.imgProfile'))
        setName(_get(response, 'data.data.name'))
      }
    } catch (error) {
      setImg('')
      console.log(error)
    }
  }
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box sx={{
        width: '400px',
        bgcolor: '#5a619929',
        borderRadius: 4,
      }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1, borderColor: 'divider', mx: 3,
            }}
            className={classes.formWrapper}
          >
            { value === '1' && (
            <Box className={classes.avatarWrapper}>
              <Avatar
                alt="profile"
                src={img}
                sx={{
                  width: 80, height: 80, border: '3px solid #00000033',
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            )}
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
              // TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
            >
              <Tab label="Login" value="1" />
              <Tab label="sIGN UP" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><SignUp type="signIn" getImg={getImg} setImg={setImg} /></TabPanel>
          <TabPanel value="2"><SignUp type="signUp" /></TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
export default SignInUp
