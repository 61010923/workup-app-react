import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignInUp from './page/signInUp'
import Home from './page/Home'
import DrawerTab from './component/drawer'
import Company from './page/Company'
import Career from './page/Career'
import './App.css'
// import Form from './component/form'

const useStyles = makeStyles({
  container: {
    marginLeft: '75px',
    marginTop: '80px',

  },
})
function App() {
  const classes = useStyles()
  return (

    <Routes>
      <Route
        exact
        path="/"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />
            <Home />
          </Box>
)}
      />
      <Route
        exact
        path="/login"
        element={(
          <SignInUp />
)}
      />
      <Route
        exact
        path="/company"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />

            <Company />

          </Box>
)}
      />
      <Route
        exact
        path="/career"
        element={(
          <Box mt={8.1} ml={9.3}>
            <DrawerTab />

            <Career />

          </Box>
)}
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>

  )
}

export default App