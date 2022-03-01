import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Avatar, ListItemButton } from '@mui/material'
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
  paper: {
    background: '#30475E',
  },
  selected: {
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
      // fontWeight: 600,
    },
    // '&:hover': {
    //   cursor: 'pointer',
    //   backgroundColor: 'orange',
    //   // '& $addIcon': {
    //   //   color: 'purple',
    //   // },
    // },
  },
})
export default function DrawerTab() {
  const theme = useTheme()
  const classes = useStyles()
  const [btValue, setBtValue] = useState(null)
  const [open, setOpen] = React.useState(false)
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleClick = (path, i) => {
    setBtValue(i)
    if (path === '/login') {
      dispatch(logout(userToken))
    }
    navigate(path)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const itemsList = [
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
    },
    {
      id: 3,
      menu: 'management',
      link: '/management',
      icon: <ManageAccountsIcon />,
    },
  ]
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
          {itemsList.map(({
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
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List style={{ marginTop: 'auto' }}>
          <ListItem button key="user" onClick={() => handleClick('/user')}>
            <ListItemIcon>
              <Avatar
                alt="N"
                src="https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.6435-9/83554419_106210414280175_3006330223613444096_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFhlvqzGStqZBAFdkhlBkQ3N8O_W_p-RZg3w79b-n5FmOoQxkPUoZM01pikcdtbyH2jPS-FIgckXfpq2_Xkjocm&_nc_ohc=XxPFHROGU58AX8oG9CK&_nc_ht=scontent.fbkk7-2.fna&oh=00_AT9baaCF4Wfjr1ECOHmlQ5y1jU1WAhXIRYwytA-E67ugJQ&oe=6238D2BA"
                sx={{ width: 40, height: 40 }}
              />
            </ListItemIcon>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Meaw Meaw
              </Typography>
              <Typography variant="body2" sx={{ color: 'blue' }}>
                Member
              </Typography>
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
