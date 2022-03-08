import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _toNumber from 'lodash/toNumber'
import axios from 'axios'
import { format } from 'date-fns'
import { Skeleton } from '@mui/material'
import { useParams } from 'react-router-dom'
import Typography from '../../component/Typography'
import sony from '../../image/sony.png'
import CareerTitle from '../../component/CareerTitle'
import Profile from '../../component/CompanyProfile'
import ImageListSkill from '../../component/ImageListSkill'

const useStyles = makeStyles((theme) => ({
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
    left: '10%',
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
    backgroundColor: theme.palette.secondary.main,
    borderBottom: '3px solid rgb(214, 214, 214)',
  },

}))

function Company() {
  const classes = useStyles()
  const [companyName, setCompanyName] = useState('Kasuya Company')
  const [imgProfile, setImgProfile] = useState('')
  const [imgCover, setImgCover] = useState('')
  const [imgAbout, setImgAbout] = useState([])
  const [detail, setDetail] = useState('')
  const [welfare, setWelfare] = useState([])
  const [job, setJob] = useState([])
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [travel, setTravel] = useState([])
  const [loading, setLoading] = useState(false)

  const setData = (data) => {
    setImgProfile(data.imgProfile)
    setImgCover(data.imgCover)
    setDetail(data.detail)
    setImgAbout(data.imgAbout)
    setCompanyName(data.companyName)
    setTravel(data.travel)
    setTel(data.phone)
    setJob(data.announce)
    setWelfare(data.welfare)
    setEmail(data.email)
    setAddress(data.address)
  }
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company/621ef4684d7f2a6a3cf81b12`,
      )
      if (response.status === 200) {
        const data = _get(response, 'data.data')
        setData(data)
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

  return (
    <Box className={classes.container}>
      <Box sx={{ borderBottom: '2px solid #F5F5F5' }}>
        <Profile
          name={companyName}
          imgProfile={imgProfile}
          setImgProfile={setImgProfile}
          imgCover={imgCover}
          setImgCover={setImgCover}
          email=""
          loading={loading}
        />
      </Box>
      <Box ml={2}>
        <Box mt={4}>
          <Typography variant="body1" loading={loading} heightSkeleton={160}>
            {detail}
          </Typography>
        </Box>
        <Box mt={4}>
          <Box mt={2}>
            <Typography variant="h6">แนะนำบริษัท</Typography>
          </Box>
          <Box mt={2}>
            <ImageListSkill imgList={imgAbout} />
          </Box>
        </Box>

        <Box mt={4}>
          <Box>
            <Typography variant="h6">สวัสดิการ</Typography>
          </Box>
          {_map(welfare, (data, i) => (
            <Box
              key={`welfare_${i}`}
              mt={i === 0 ? 2 : 1}
              display="flex"
              alignItems="center"
            >
              <Box>
                <Typography variant="body1">-</Typography>
              </Box>
              <Box ml={2} minWidth={80}>
                <Typography variant="body1" loading={loading}>
                  {data}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box className={classes.barPositions} mt={4}>
          <Box minWidth={60}>
            <Typography variant="body1" mr={2} loading={loading}>
              {`${job.length} positions`}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.positionWrapper}>
          {!loading ? (
            <>
              {_map(job, (data) => (
                <CareerTitle
                  salary={data.salary}
                  location={data.location}
                  interview={data.interview}
                  position={data.position}
                  date={format(
                    new Date(`${_get(data, 'updatedAt')}`),
                    'dd/MM/yyyy',
                  )}
                />
              ))}
            </>
          ) : (
            <Skeleton height={200} />
          )}
        </Box>

        <Box mt={4} mx={2}>
          <Typography variant="h6">Contact</Typography>
          <Box mt={2}>
            <Typography variant="body1" loading={loading}>
              {address}
            </Typography>
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <Box>
              <Typography variant="body1">Email:</Typography>
            </Box>
            <Box ml={1} minWidth={80}>
              <Typography variant="body1" loading={loading}>
                {email}
              </Typography>
            </Box>
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <Box>
              <Typography variant="body1">Tel:</Typography>
            </Box>
            <Box ml={1} minWidth={80}>
              <Typography variant="body1" loading={loading}>
                {tel}
              </Typography>
            </Box>
          </Box>
          <Box mt={4}>
            <Box mt={2}>
              <Typography variant="h6">วิธีการเดินทาง</Typography>
            </Box>
            {_map(travel, (data, i) => (
              <Box
                key={`travel${i}`}
                mt={i === 0 ? 2 : 1}
                display="flex"
                alignItems="center"
              >
                <Box>
                  <Typography variant="body1">-</Typography>
                </Box>
                <Box ml={2} minWidth={80}>
                  <Typography variant="body1" loading={loading}>
                    {data}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
// const rootElement = document.getElementById('root')
// ReactDOM.render(<Company />, rootElement)
export default Company
