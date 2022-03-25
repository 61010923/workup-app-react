import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import _map from 'lodash/map'
import ButtonGradient from './ButtonGradient'

const useStyles = makeStyles((theme) => ({
  cardList: {
    display: 'flex',
    padding: '3rem 2rem',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'linear-gradient(90deg,#201c29,#201c29 1px,#17141d 0,#17141d)',
      borderRadius: '10px',

    },
    '&::-webkit-scrollbar-thumb': {
      background: '#201c29',
      borderRadius: '10px',
      boxShadow: 'inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25)',
    },
  },
  card: {
    height: '400px',
    width: '400px',
    minWidth: '250px',
    // padding: '1.5rem',
    overflow: 'hidden',
    borderRadius: '16px',
    background: '#17141d',
    boxShadow: '-0.5rem 0 1.5rem #000',
    display: 'flex',
    flexDirection: 'column',
    transition: '.2s',
    margin: 0,
    scrollSnapAlign: 'start',
    clear: 'both',
    position: 'relative',
    '&:hover ~ $card': {
      transform: 'translateX(130px)',
    },
    '&:not(:first-child)': {
      marginLeft: '-130px',
    },
    '&:hover ': {
      transform: 'translateY(-1rem)',
    },
  },
  imgBx: {
    height: '200px',

    '& img': {
      display: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  contentBx: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
}))
function StackedCard({ data }) {
  const classes = useStyles()

  return (
    <Box className={classes.cardList}>
      {_map(data, (item, i) => (
        <Box className={classes.card} key={item.id}>
          <Box className={classes.imgBx}>
            <img src={item.imgProfile} alt="img" />
          </Box>
          <Box className={classes.contentBx}>

            <Box sx={{
              overflowWrap: 'break-word',
              height: '120px',
              overflow: 'hidden',
            }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {item.companyName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#cbcbcb',

                }}
              >
                {item.position}
              </Typography>
            </Box>
            <Box sx={{
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: '16px',
            }}
            >
              <ButtonGradient />
            </Box>
          </Box>
        </Box>
      ))}

    </Box>
  )
}

export default StackedCard
StackedCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
}
StackedCard.defaultProps = {
  data: [],

}
