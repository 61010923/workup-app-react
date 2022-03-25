import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  buttonBx: {
    position: 'relative',
    display: 'inline-block',
    padding: '10px 20px',
    color: '#2196f3',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '16px',
    overflow: 'hidden',
    transition: '0.2s',
    cursor: 'pointer',
    '& span': {
      position: 'absolute',
      display: 'block',
      '&:nth-child(1)': {
        top: 0,
        left: '-100%',
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg,transparent,#2196f3)',
      },
      '&:nth-child(2)': {
        top: '-100%',
        right: 0,
        width: '2px',
        height: '100%',
        background: 'linear-gradient(180deg,transparent,#2196f3)',
      },
      '&:nth-child(3)': {
        bottom: 0,
        right: '-100%',
        width: '100%',
        height: '2px',
        background: 'linear-gradient(270deg,transparent,#2196f3)',
      },
      '&:nth-child(4)': {
        bottom: '-100%',
        left: 0,
        width: '2px',
        height: '100%',
        background: 'linear-gradient(360deg,transparent,#2196f3)',
      },
    },
    '&:hover': {
      color: '#255784',
      background: '#2196f3',
      boxShadow: '0 0 10px #2196f3, 0 0 40px #2196f3',
      transitionDelay: '1s',
      '& span': {
        '&:nth-child(1)': {
          left: '100%',
          transition: '1s',
        },
        '&:nth-child(2)': {
          top: '100%',
          transition: '1s',
          transitionDelay: '0.25s',
        },
        '&:nth-child(3)': {
          right: '100%',
          transition: '1s',
          transitionDelay: '0.5s',
        },
        '&:nth-child(4)': {
          bottom: '100%',
          transition: '1s',
          transitionDelay: '0.75s',
        },

      },
    },
  },
}))
function ButtonGradient() {
  const classes = useStyles()
  return (
    <Box className={classes.buttonBx}>
      learn more
      <span />
      <span />
      <span />
      <span />
    </Box>
  )
}

export default ButtonGradient
