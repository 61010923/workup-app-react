import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined'
import computerImg from '../image/computer.png'

const useStyles = makeStyles({
  content: {
  },
  title: {
  },
  hexagon: {
    position: 'relative',
    maxWidth: '350px',
    height: '400px',
    margin: '50px 20px 70px',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '-70px',
      width: '100%',
      height: '60px',
      background: 'radial-gradient(rgba(0,0,0,0.15), transparent,transparent)',
      borderRadius: '50%',
      transition: '0.5s',
    },
    '& .shape': {
      position: 'absolute',
      top: 0,
      Left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#30475E',
      clipPath: 'polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%)',
      transition: '0.5s',
      '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      '& $content': {
        position: 'absolute',
        top: 0,
        Left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(45deg,#30475E,rgba(3,169,244,0.5))',
        color: '#fff',
        opacity: '0',
        transition: '0.5s',
      },
      '& $title': {
        position: 'absolute',
        top: 0,
        Left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        transition: '0.5s',
      },
    },
    '&:hover': {
      '&::before': {
        opacity: '0.8',
        transform: 'scale(0.8)',
      },
      '& .shape': {
        transform: 'translateY(-30px)',
        '& $content': {
          opacity: '1',

        },
      },

    },

  },
})
function Hexagon() {
  const classes = useStyles()
  return (
    <Box
      className={classes.hexagon}
    >
      <Box className="shape">
        <img src={computerImg} alt="hexagon" />
        <Box className={classes.title}>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '5rem',
                textShadow: '0 0 20px #30475E',
              }}
            >
              หน้าที่
            </Typography>
            <Box sx={{ textShadow: '0 0 20px #30475E' }}>
              <TouchAppOutlinedIcon sx={{
                fontWeight: 'bold',
                fontSize: '5rem',

              }}
              />
            </Box>

          </Box>
        </Box>
        <Box className={classes.content}>
          <Box>
            <Typography variant="body2" sx={{ padding: '20px' }}>
              Born in the San Francisco Bay Area to a Samoan mother and a Black Nova Scotian father, Johnson played college football at the University of Miami, and won a national championship in 1991. He aspired to a professional career in football, but went undrafted in the 1995 NFL Draft. He signed with the Calgary Stampeders of the Canadian Football League (CFL), but was cut from the team in his first season.
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default Hexagon
