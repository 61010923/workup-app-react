import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import OwlCarousel from 'react-owl-carousel'
import Typography from '@mui/material/Typography'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _toNumber from 'lodash/toNumber'
import axios from 'axios'
import Card from '../../component/Cart'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import sony from '../../image/sony.png'
import TabJob from '../../component/TabJob'
import CompaniesItem from '../../component/CompaniesItem'

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
  },
}
const useStyles = makeStyles({
  container: {
    // marginTop: '80px',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState([])
  const [position, setPosition] = useState([])
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company`,
      )
      if (response.status === 200) {
        setCompany(_get(response, 'data.data'))
        setPosition(_get(response, 'data.announce'))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
        {company.map(({
          announceText, companyId, companyName, imgCover, imgProfile,
        }) => (
          <Card title={companyName} image={imgProfile} describe={announceText} />
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

export default Home
