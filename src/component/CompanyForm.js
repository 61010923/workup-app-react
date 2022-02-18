import React from 'react'
import { Box, Avatar, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import sony from '../image/sony.png'
import CompanyInformation from './CompanyInformation'
import TableCompany from './TableCompany'
import AccountTab from './AccountTab'
import AddPosition from './AddPosition'

const useStyles = makeStyles({
  tabPanel: {

    margin: '0 auto',

  },
})
function UserForm() {
  const classes = useStyles()
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box className={classes.container}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1, borderColor: 'divider', mx: 3,
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab label="Account" value="1" />
            <Tab label="Company Information" value="2" />
            <Tab label="Job Positions" value="3" />
          </TabList>
        </Box>
        <Box className={classes.tabPanel}>
          <TabPanel value="1"><AccountTab /></TabPanel>
          <TabPanel value="2"><CompanyInformation /></TabPanel>
          <TabPanel value="3">
            <AddPosition />
            <TableCompany />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  )
}

export default UserForm