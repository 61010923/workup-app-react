import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import sony from '../image/sony.png'

const useStyles = makeStyles({

  CompaniesItem: {
    width: '220px',
    margin: '8px',
    borderRadius: '20px',
    boxShadow: '0 0 4px 2px #939393',
    cursor: 'pointer',
    transition: 'transform 1s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
})
function CompaniesItem() {
  const classes = useStyles()

  return (
    <img className={classes.CompaniesItem} alt="item" src={sony} />
  )
}

export default CompaniesItem
