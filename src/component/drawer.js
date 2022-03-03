import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import {
  Box, Avatar, Button, ListItemButton,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useNavigate } from 'react-router-dom'
import _get from 'lodash/get'
import LogoutIcon from '@mui/icons-material/Logout'
import axios from 'axios'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { makeStyles } from '@mui/styles'
import { logout } from '../redux/action/user.action'
import userDetail from '../redux/selector/user.selector'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const useStyles = makeStyles({
  // paper: {
  //   background: '#30475E',
  // },
  selected: {
    '&.css-1crvzwi-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
      backgroundColor: '#30475E',
    },
    '&.Mui-selected': {
      backgroundColor: '#30475E',
      color: 'white',
      '&$selected:hover': {
        backgroundColor: '#30475E',
        color: 'white',
        '& .MuiListItemIcon-root': {
          color: 'white',
        },
      },
    },
  },
})
export default function DrawerTab() {
  const theme = useTheme()
  const classes = useStyles()
  const [btValue, setBtValue] = useState(null)
  const [open, setOpen] = React.useState(false)
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const userType = _get(user, 'userDetail.userType')
  const [allData, setAllData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleClick = (path, i) => {
    setBtValue(i)
    if (path === '/logout') {
      dispatch(logout(userToken))
      navigate('/login')
    } else {
      navigate(path)
    }
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const itemsListCandidate = [
    {
      id: 1,
      menu: 'Home',
      link: '/',
      icon: <HomeIcon />,
    },

    {
      id: 2,
      menu: 'Jop applying',
      link: '/eeee',
      icon: <ManageAccountsIcon />,
      isLogin: !user.isLogin,
    },
    {
      id: 3,
      menu: 'login',
      link: '/login',
      icon: <LoginIcon />,
      isLogin: user.isLogin,
    },
    {
      id: 4,
      menu: 'Logout',
      link: '/logout',
      icon: <LogoutIcon />,
      isLogin: !user.isLogin,
    },
  ]
  const itemsListCompany = [
    {
      id: 1,
      menu: 'home',
      link: '/',
      icon: <HomeIcon />,
    },
    {
      id: 2,
      menu: 'login',
      link: '/login',
      icon: <LoginIcon />,
      isLogin: user.isLogin,
    },
    {
      id: 3,
      menu: 'Annoucement',
      link: '/management',
      icon: <ManageAccountsIcon />,
      isLogin: !user.isLogin,
    },
    {
      id: 4,
      menu: 'logout',
      link: '/logout',
      icon: <LogoutIcon />,
      isLogin: !user.isLogin,
    },
  ]
  let itemsList
  if (userType === 'company') {
    itemsList = itemsListCompany
  } else {
    itemsList = itemsListCandidate
  }
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
  const getCompanyProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/companyProfile/profile`, {
        headers: {
          authorization: userToken,
        },
      })
      if (response.status === 200) {
        setAllData(_get(response, 'data.data'))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (userType === 'company') {
      getCompanyProfile()
    } else if (userType === 'candidate') {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken])
  return (
    <Box>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open} color="common">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            height="100%"
          >
            <Box>
              <Typography variant="h6" noWrap component="div">
                WorkUp
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" noWrap component="div">
                Let the journey begin
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {itemsList.filter((obj) => !obj.isLogin).map(({
            id, menu, link, icon,
          }, i) => (
            <ListItemButton
              button
              key={id}
              onClick={() => handleClick(link, i)}
              className={classes.selected}
              selected={btValue === i}
            >
              {icon && (
              <ListItemIcon
                className={classes.selected}
                sx={{ color: btValue === i ? 'white' : '#30475E' }}
              >
                {icon}
              </ListItemIcon>
              )}
              <ListItemText primary={menu} className={classes.selected} />
            </ListItemButton>
          ))}
        </List>
        {user.isLogin && (
        <List style={{ marginTop: 'auto' }}>
          <ListItem
            button
            key="user"
          >
            <ListItemIcon>
              <Avatar
                alt="N"
                src={allData.imgProfile}
                sx={{ width: 40, height: 40, mt: '7px' }}
              />
            </ListItemIcon>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {userType === 'company'
                  ? allData?.companyName : `${`${allData?.firstName} ${allData.lastName}`}`}
              </Typography>
              <Button
                onClick={() => handleClick(`/${userType}Personal`)}
                startIcon={<SettingsOutlinedIcon />}
                variant="outlined"
                color="info"
                size="small"
                sx={{ borderRadius: '1rem', fontSize: '8px', fontWeight: 'bold' }}
              >
                Profile Settings
              </Button>
            </Box>
          </ListItem>
        </List>
        )}
      </Drawer>
    </Box>
  )
}
