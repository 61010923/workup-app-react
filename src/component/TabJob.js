import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import sony from '../image/sony.png'

const useStyles = makeStyles({

  urgentJobItems: {
    display: 'flex',
    margin: '8px',
    justifyContent: 'space-between',
    padding: '8px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: '0.5s',
    '&:hover': {
      backgroundColor: '#40404059',
    },

  },
  imageSetting: {

    borderRadius: '20px',
    width: '130px',
    boxShadow: '0 0 4px 2px #939393',
  },
})
function TabJob() {
  const classes = useStyles()
  return (
    <Box className={classes.urgentJobItems}>
      <Box>
        <Typography gutterBottom variant="h5" component="div">
          sony
        </Typography>
        <Typography variant="body2" color="text.secondary">
          รับสมัคร Process engineer
        </Typography>
      </Box>
      <img className={classes.imageSetting} alt="sony" src={sony} />
    </Box>
  )
}

export default TabJob
