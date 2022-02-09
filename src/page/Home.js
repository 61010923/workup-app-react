import React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import ReactDOM from 'react-dom'
import OwlCarousel from 'react-owl-carousel'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '../component/Cart'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import sony from '../image/sony.png'
import TabJob from '../component/TabJob'
import CompaniesItem from '../component/CompaniesItem'

const options = {
  // margin: 30,
  responsiveClass: true,
  nav: true,
  dots: true,
  autoplay: true,
  // navText: ['Prev', 'Next'],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    550: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
    1400: {
      items: 5,

    },
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 1,
    //   },
    //   600: {
    //     items: 2,
    //   },
    //   700: {
    //     items: 3,
    //   },
    //   1000: {
    //     items: 5,

  //   },
  },
}
const useStyles = makeStyles({
  container: {
    // marginTop: '80px',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '2rem',
  },
  urgentJob: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    // width: '95%',
  },
  hotCompanies: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: '8px',

  },
})
function Home() {
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
      <Typography variant="h6" ml={2}>
        TOP COMPANIES
      </Typography>

      <OwlCarousel className="owl-theme" {...options}>
        {itemsList.map(({
          id, title, image, describe,
        }) => (
          <Card title={title} image={image} describe={describe} />
        ))}
      </OwlCarousel>

      <Typography variant="h6" ml={2}>
        URGENT JOBS
      </Typography>
      <Box className={classes.urgentJob}>
        <TabJob />
        <TabJob />
        <TabJob />
        <TabJob />

      </Box>
      <Typography variant="h6" ml={2}>
        HOT COMPANIES
      </Typography>
      <Box className={classes.hotCompanies}>
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
        <CompaniesItem />
      </Box>
    </Box>
  )
}
// const rootElement = document.getElementById('root')
// ReactDOM.render(<Home />, rootElement)
export default Home
