import React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { makeStyles } from '@mui/styles'
import { Avatar } from '@mui/material'
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
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box sx={{
        width: '400px',
        typography: 'body1',
        // margin: '0 auto',
        bgcolor: '#5a619929',
        boxShadow: 5,
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
                alt="PraYut"
                src="https://images.uncyc.org/th/thumb/e/e1/%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B9%8C%E0%B9%81%E0%B8%94%E0%B8%87.jpg/300px-%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B9%8C%E0%B9%81%E0%B8%94%E0%B8%87.jpg"
                sx={{
                  width: 80, height: 80, border: '3px solid #00000033',
                }}
              />
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
          <TabPanel value="1"><SignUp type="signIn" /></TabPanel>
          <TabPanel value="2"><SignUp type="signUp" /></TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
export default SignInUp
