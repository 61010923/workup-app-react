import React from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactDOM from 'react-dom'
import Typography from '@mui/material/Typography'
import sony from '../image/sony.png'
import CompanyLogo from '../component/CompanyLogo'
import CareerAbout from '../component/CareerAbout'
import CareerSuggest from '../component/CareerSuggest'

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    padding: '2rem 3rem',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  PositionWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
  },

})
function Company() {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box mb={3}>
        <CompanyLogo />
      </Box>
      <CareerAbout />
      <Box mt={2} mx={2}>
        <Typography variant="h6">
          Job Descriptions
        </Typography>
        <Typography variant="body2">
          - Main responsibility root cause analysis for electrical function defect of IP & HV phase
          - Yield improvement for both IP & HV
          - IP product verification
          - Quality issue problem solving & finding countermeasure
        </Typography>
      </Box>
      <Box mt={2} mx={2}>
        <Typography variant="h6">
          Other positions at this company

        </Typography>
        <Box className={classes.PositionWrapper}>
          <CareerSuggest />
          <CareerSuggest />
          <CareerSuggest />
          <CareerSuggest />
          <CareerSuggest />
        </Box>
      </Box>
    </Box>

  )
}
// const rootElement = document.getElementById('root')
// ReactDOM.render(<Company />, rootElement)
export default Company
