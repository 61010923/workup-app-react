import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import sony from '../../image/sony.png'
import CareerTitle from '../../component/CareerTitle'

const useStyles = makeStyles({
  container: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '0rem 3rem',
  },
  imageSize: {
    width: '100%',
    height: '250px',
    // objectFit: 'cover',
    // objectPosition: 'bottom',
  },
  coverImage: {
    position: 'relative',
  },
  imageLogo: {
    position: 'absolute',

    top: '270px',
    left: '160px',
    width: '180px',
    boxShadow: '0 0 3px 2px white',
    borderRadius: '20px',
  },
  CompanyName: {
    position: 'absolute',
    // top: '270px',
    // left: '200px',
    top: '335px',
    left: '360px',
  },
  barPositions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '16px',
    height: '50px',
    backgroundColor: 'rgb(240, 240, 240)',
    borderBottom: '3px solid rgb(214, 214, 214)',
  },

})
function Company() {
  const classes = useStyles()
  const itemsList = [
    {
      id: 1,
      title: 'sony',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
    {
      id: 2,
      title: 'synnex',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
    {
      id: 3,
      title: 'apple',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
    {
      id: 4,
      title: 'kmitl',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
    {
      id: 4,
      title: 'kmitl',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
    {
      id: 4,
      title: 'kmitl',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
    {
      id: 4,
      title: 'kmitl',
      image: sony,
      describe: 'รับสมัคร Process engineer',
    },
  ]
  return (
    <Box className={classes.container}>
      <Box className={classes.CoverImage}>
        <img
          className={classes.imageSize}
          src="https://i3.wp.com/knowsara.com/wp-content/uploads/2020/02/%E0%B9%82%E0%B8%8B%E0%B8%99%E0%B8%B5%E0%B9%88-735x400-1.jpg"
          alt="sony"
        />
        <img
          className={classes.imageLogo}
          src={sony}
          alt="sony"
        />
        <Typography variant="h5" className={classes.CompanyName}>Sony technology</Typography>
      </Box>
      <Typography variant="body2" mt={8} mx={2}>
        Sony Technology (Thailand) Co., Ltd is the manufacturing base located in Amata City Chonburi, Chonburi province producing world-leading products such as Digital Camera, Car Audio, and other key parts under the renowned “Sony” brand. Our brands vision is to use our unlimited passion for technology, content and services to deliver ground breaking new excitement and entertainment as only Sony can.
        To enhance future growth by introducing XperiaTM mobile phone production in Thailand, we are strengthening our workforce at our factory located in Bangkadi Industrial Park and we welcome people with professionalism, initiative and curiosity, and who are driven to take on new challenges to join our team for the following positions:
      </Typography>
      <Box className={classes.barPositions}>
        <Typography variant="body2" mr={2}>
          5 positions
        </Typography>
      </Box>
      <Box className={classes.positionWrapper}>

        <CareerTitle />
        <CareerTitle />
        <CareerTitle />
        <CareerTitle />

      </Box>
      <Box mt={2} mx={2}>
        <Typography variant="h6">
          Contact
        </Typography>
        <Typography variant="body2">
          ฝ่ายบริหารทรัพยากรมนุษย์
          Sony Technology (Thailand) Co., Ltd.
          700 / 402 หมู่ 7 อมตะซิตี้ ชลบุรี เฟส 4
        </Typography>
      </Box>
    </Box>

  )
}
// const rootElement = document.getElementById('root')
// ReactDOM.render(<Company />, rootElement)
export default Company
