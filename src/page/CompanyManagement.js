import React from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CompanyProfile from '../component/CompanyProfile'
import CompanyForm from '../component/CompanyForm'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    margin: '2rem 5rem',
    justifyContent: 'center',
    flexDirection: 'column',
  },

})
function CompanyManagement() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)', borderRadius: 2,
      }}
      >
        <CompanyProfile />
      </Box>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)', borderRadius: 2, mt: 2,
      }}
      >
        <CompanyForm />
      </Box>
    </Box>

  )
}

export default CompanyManagement
