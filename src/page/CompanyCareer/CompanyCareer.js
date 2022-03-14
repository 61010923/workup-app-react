import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import { Box, Button, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import sony from '../../image/sony.png'
import CompanyLogo from '../../component/CompanyLogo'
import CareerAbout from '../../component/CareerAbout'
import CareerSuggest from '../../component/CareerSuggest'
import userDetail from '../../redux/selector/user.selector'
import TypographyLoading from '../../component/Typography'
import Hexagon from '../../component/Hexagon'

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  PositionWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
  },

})
function Company() {
  const classes = useStyles()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/announcement/${id}`)
      if (response.status === 200) {
        setData(_get(response, 'data.data'))
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
    window.scrollTo(0, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            window.history.back()
          }}
        >
          back
        </Button>
      </Box>
      <Box className={classes.container}>

        <Box mb={3}>
          <CompanyLogo
            loading={loading}
            data={{
              companyName: data?.companyName,
              imgProfile: data?.imgProfile,
              companyId: data.announce?.companyId,
            }}
          />
        </Box>
        <Box mb={3}>

          <CareerAbout
            loading={loading}
            data={{
              createdAt: format(new Date(_get(data, 'announce.createdAt', new Date())), 'MMM dd, yyyy'),
              position: data?.announce?.position,
              location: data?.announce?.location,
              salary: data?.announce?.salary,
              positionTotal: data?.announce?.positionTotal,
              interview: data?.announce?.interview,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography variant="h6">
            หน้าที่และรายละเอียดของงาน
          </Typography>
          {loading ? (<Skeleton width="50%" height={40} />
          )
            : (
              <Box sx={{ marginLeft: 2 }}>
                {_map(data?.announce?.role, (item, i) => (

                  <Box
                    sx={{
                      backgroundColor: 'primary.mediumFade',
                      m: 0.5,
                      p: 1,
                      width: '50%',
                      display: 'block',
                      borderRadius: '8px',
                      transition: '0.5s',
                      color: 'primary.main',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        color: '#fff',
                        backgroundColor: 'primary.medium',

                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      // sx={{ color: '#fff' }}
                    >
                      {i + 1}
                      {'. '}
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
        </Box>
        <Box mb={3}>
          <Typography variant="h6">
            คุณสมบัติผู้สมัคร
          </Typography>
          {loading ? (<Skeleton width="50%" height={40} />
          )
            : (
              <Box sx={{ marginLeft: 2 }}>
                {_map(data?.announce?.property, (item, i) => (

                  <Box
                    sx={{
                      backgroundColor: 'primary.mediumFade',
                      m: 0.5,
                      p: 1,
                      width: '50%',
                      display: 'block',
                      borderRadius: '8px',
                      transition: '0.5s',
                      color: 'primary.main',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        color: '#fff',
                        backgroundColor: 'primary.medium',

                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                    >
                      {i + 1}
                      {'. '}
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
        </Box>
        {/* <Box>
          <Hexagon />
        </Box> */}
        <Box>
          {!_isEmpty(data.otherAnnounce)
          && (
          <Typography variant="h6">
            Other positions at this company
          </Typography>
          )}

          {loading ? (
            <Box sx={{
              display: 'flex', height: 216, overflow: 'hidden', flexWrap: 'wrap',
            }}
            >
              <Skeleton
                variant="rectangular"
                height={200}
                width="23%"
                sx={{ margin: '8px', borderRadius: '8px' }}
              />
              <Skeleton
                variant="rectangular"
                height={200}
                width="23%"
                sx={{ margin: '8px', borderRadius: '8px' }}
              />
              <Skeleton
                variant="rectangular"
                height={200}
                width="23%"
                sx={{ margin: '8px', borderRadius: '8px' }}
              />
              <Skeleton
                variant="rectangular"
                height={200}
                width="23%"
                sx={{ margin: '8px', borderRadius: '8px' }}
              />
            </Box>
          ) : (
            <Box className={classes.PositionWrapper}>
              {_map(data.otherAnnounce, ({
                _id, position, location, salary,
              }, i) => (
                <CareerSuggest data={{
                  id: _id,
                  position,
                  location,
                  salary,
                }}
                />

              ))}
            </Box>
          )}
          {/* <Hexagon /> */}
        </Box>
      </Box>

    </>

  )
}
export default Company
