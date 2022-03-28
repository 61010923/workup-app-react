import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import _startCase from 'lodash/startCase'
import { keyframes } from '@mui/system'

const textEffect = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`
const useStyles = makeStyles((theme) => ({

  card: {
    position: 'relative',
    minWidth: '140px',
    height: '100px',
    margin: '20px',
    padding: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    background: '#333',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      '& $text': {
        color: '#fff',
        transform: 'scale(1.1)',
      },
    },
  },
  text: {
    letterSpacing: '2px',
    transition: '0.5s',
  },
}))
function CardGlass({
  title, image, describe, cover, companyId,
}) {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Box className={classes.card} onClick={() => navigate(`/${companyId}`)}>
      <Typography
        className={classes.text}
        sx={{
          color: 'rgba(0,0,0,0)',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          WebkitTextStroke: '0.2px #fff',
          textTransform: 'capitalize',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default CardGlass
CardGlass.propTypes = {
  title: PropTypes.string,
  describe: PropTypes.string,
  image: PropTypes.string,
  cover: PropTypes.string,
  companyId: PropTypes.string,
}
CardGlass.defaultProps = {
  title: '',
  describe: '',
  image: '',
  cover: '',
  companyId: '',
}
