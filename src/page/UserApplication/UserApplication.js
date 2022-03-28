import React, { useState, useEffect } from 'react'
import format from 'date-fns/format'
import {
  Box, Button, Chip, MenuItem,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import EmailIcon from '@mui/icons-material/Email'
import _isEmpty from 'lodash/isEmpty'
import BusinessIcon from '@mui/icons-material/Business'
import _startCase from 'lodash/startCase'
import _map from 'lodash/map'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import Skeleton from '@mui/material/Skeleton'
import SchoolIcon from '@mui/icons-material/School'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import Swal from 'sweetalert2'
import pdfImage from '../../image/pdf.png'
import Typography from '../../component/Typography'
import Footer from '../../component/Footer'
import ImgListSkill from '../../component/ImageListSkill'
import UserProfile from '../../component/UserProfile'
import userDetail from '../../redux/selector/user.selector'
import { alertBar } from '../../redux/action/alert.action'
import 'sweetalert2/dist/sweetalert2.css'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '90%',
    margin: '0 auto',
    padding: '2rem 0',
  },
  container: {
    display: 'flex',
    margin: '24px',
    justifyContent: 'center',
    // flexDirection: 'column',
  },
  borderBox: {
    borderBottom: '2px solid ',
    borderColor: theme.palette.primary.main,
    padding: '16px 0',
  },
  fileList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #93939336',
    borderRadius: '8px',
    marginBottom: '8px',
    marginRight: '6px',
    marginLeft: '1px',
    padding: '8px',
    // transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: '3px 3px 3px rgba(0,0,0,0.2),-1px -1px 1px rgba(0,0,0,0.05)',
    },
  },
  pdfImage: {
    minWidth: '2.5rem',
    height: '2.5rem',
    marginRight: '0.5rem',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  fileBx: {
    backgroundColor: '#f5f5f56b',
    maxHeight: '15rem',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#E6E6E6',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#9C9C9C',
      borderRadius: '8px',
    },
  },
}))
const Maritals = [
  {
    id: 'single',
    value: 'โสด',
  },
  {
    id: 'engaged',
    value: 'หมั้น',
  },
  {
    id: 'married',
    value: 'แต่งงาน',
  },
  {
    id: 'separated',
    value: 'หย่า',
  },
  {
    id: 'widowed',
    value: 'หม้าย',
  },
]
const genders = [
  {
    id: 'male',
    value: 'ชาย',
  },
  {
    id: 'female',
    value: 'หญิง',
  },
  {
    id: 'none',
    value: 'ไม่ระบุ',
  },
]
function CalculateAge(birthday) {
  // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
function UserApplication() {
  const classes = useStyles()
  const history = useNavigate()
  const { id } = useParams()
  const { state } = useLocation() // position
  const [email, setEmail] = useState('')
  const [emailAuth, setEmailAuth] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState(null)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [marital, setMarital] = useState('')
  const [address, setAddress] = useState('')
  const [interestedJob, setInterestedJob] = useState([''])
  const [education, setEducation] = useState([
    { education: '', major: '', university: '' },
  ])
  const [skill, setSkill] = useState([])
  const [image, setImage] = useState([])
  const [profile, setProfile] = useState(null)
  const [experience, setExperience] = useState([])
  const [loading, setLoading] = useState(false)
  const [otherFile, setOtherFile] = useState([])
  const [openError, setOpenError] = useState(false)
  const [openSkeleton, setOpenSkeleton] = useState(true)
  const [responsible, setResponsible] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const newDate = new Date()
  const newDateMax = new Date()
  const dispatch = useDispatch()
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  // const emailValidate = (e) => {
  // const decreaseDateMin = new Date(
  //   newDate.setFullYear(newDate.getFullYear() - 60),
  // )
  // const decreaseDateMax = new Date(
  //   newDateMax.setFullYear(newDateMax.getFullYear() - 15),
  // )
  //   const re = /\S+@\S+\.\S+/
  //   return re.test(e)
  // }
  // const checkEmail = (e) => {
  //   let errorMessage = ''
  //   if (openError && !emailValidate(email)) {
  //     errorMessage = 'please check email'
  //   }
  //   if (openError && _isEmpty(email)) {
  //     errorMessage = 'please fill email'
  //   }
  //   return errorMessage
  // }
  // const handleChange = (e, setValue) => {
  //   const { value } = e.target
  //   setValue(value)
  // }
  // const handleChangeGender = (event) => {
  //   setGender(event.target.value)
  // }
  // const handleChangeMarital = (event) => {
  //   setMarital(event.target.value)
  // }
  // const handleSubmit = async () => {
  //   setLoading(true)
  //   setOpenError(true)
  //   if (
  //     !_isEmpty(email)
  //     && emailValidate(email)
  //     && !_isEmpty(firstName)
  //     && !_isEmpty(lastName)
  //     && !_isEmpty(birthday)
  //     && !_isEmpty(gender)
  //     && !_isEmpty(marital)
  //     && !_isEmpty(address)
  //     && !_isEmpty(aboutMe)
  //     && !_isEmpty(responsible)
  //     && !_isEmpty(city)
  //     && !_isEmpty(phone)
  //     && _every(interestedJob, (item) => item.length > 0)
  //     && _every(
  //       education,
  //       (item) => item.education.length > 0
  //         && item.major.length > 0
  //         && item.university.length > 0,
  //     )
  //     && !_isEmpty(skill)
  //     && _every(image, (item) => item.length > 0)
  //   ) {
  //     const body = {
  //       email,
  //       firstName,
  //       lastName,
  //       birthDate: new Date(birthday).toISOString(),
  //       gender,
  //       marital,
  //       address,
  //       interestedJob,
  //       education,
  //       pastWork: skill,
  //       pastWorkImg: image,
  //       imgProfile: profile,
  //       aboutMe,
  //       city,
  //       responsible,
  //       phone,
  //     }
  //     try {
  //       const response = await axios.patch(
  //         `${process.env.REACT_APP_BASE_URL}/api/v1/userProfile/profile`,
  //         body,
  //         {
  //           headers: {
  //             authorization: userToken,
  //             'Content-type': 'application/json',
  //           },
  //         },
  //       )
  //       if (response.status === 201 || response.status === 200) {
  //         // history('/login/verify-account')

  //         dispatch(alertBar(true, 'success', 3000, 'Update Complete'))
  //         setLoading(false)
  //         setOpenError(false)
  //         // setInterval(() => {
  //         //   window.location.reload()
  //         // }, 3000)
  //       }
  //     } catch (error) {
  //       dispatch(alertBar(true, 'warning', 3000, 'Something went wrong'))
  //       setLoading(false)
  //       console.log(error)
  //     }
  //   } else {
  //     dispatch(alertBar(true, 'warning', 3000, 'Please fill all the fields'))
  //     setLoading(false)
  //   }
  // }
  const setBody = (data) => {
    setEmail(data.email)
    setEmailAuth(data.emailAuth)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setBirthday(data.birthDate)
    setResponsible(data.responsible)
    setAboutMe(data.aboutMe)
    setPhone(data.phone)
    setCity(data.city)
    if (!_isEmpty(data.birthDate)) {
      setAge(CalculateAge(new Date(data.birthDate)))
    }
    genders.forEach((x) => x.id === data.gender && setGender(x.value))
    Maritals.forEach((x) => x.id === data.marital && setMarital(x.value))

    setAddress(data.address)
    if (!_isEmpty(data.interestedJob)) {
      setInterestedJob(data.interestedJob)
    }
    if (!_isEmpty(data.education)) {
      setEducation(data.education)
    }
    if (!_isEmpty(data.pastWork)) {
      setSkill(data.pastWork)
    }
    setExperience(data.experience)
    setImage(data.pastWorkImg)
    setProfile(data.imgProfile)
  }
  async function fetchData() {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/application/company/${id}`,
        {
          headers: {
            authorization: userToken,
          },
        },
      )
      if (response.status === 200 || response.status === 201) {
        setBody(_get(response, 'data.data.userProfile'))
        setOtherFile(_get(response, 'data.data.other'))
        setOpenSkeleton(false)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    // eslint-disable-next-line radix
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`
  }
  const handleSubmit = (status) => {
    if (status === 'wait') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'กรุณายืนยันการเปลี่ยนสถานะเป็น “รอการติดต่อกลับ”',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Updated!',
            'เปลี่ยนสถานะเป็น “รอการติดต่อกลับ” เรียบร้อย',
            'success',
          )
        }
      })
    } else if (status === 'reject') {
      alert('ยังไม่ได้ทำ')
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, id])
  return (
    <>
      <Box className={classes.container}>
        <Grid container width="100%">
          <Grid item md={3} xs={12}>
            <Box
              sx={{
                backgroundColor: '#30475E',
                borderRadius: '2px 0 0 0',
                // border: 'solid 2px',
                // boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',
                width: '100%',
                height: '100%',
              }}
            >
              <UserProfile
                loading={loading}
                data={{
                  firstName,
                  lastName,
                  emailAuth,
                  responsible,
                }}
                state={profile}
                setState={setProfile}
              />
              <Box margin={2} mx={3}>
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.borderBox}
                >
                  {!loading && <EmailIcon color="secondary" />}
                  <Box ml={2} minWidth={60}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      loading={loading}
                    >
                      {email}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  className={classes.borderBox}
                >
                  {!loading && <PhoneIcon fontSize="small" color="secondary" />}
                  <Box ml={2} minWidth={60}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      loading={loading}
                    >
                      {phone}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  className={classes.borderBox}
                >
                  {!loading && (
                  <LocationOnIcon fontSize="small" color="secondary" />
                  )}
                  <Box ml={2} minWidth={60}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      loading={loading}
                    >
                      {city}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={9} xs={12}>
            <Box
              sx={{
                backgroundColor: 'rgb(248 248 248)',
                borderRadius: '0 2px 2px 2px',
                // boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',
                width: '100%',
                maxHeight: '600px',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '0.8rem',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#E6E6E6',
                  borderRadius: '0.5rem',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#9C9C9C',
                  borderRadius: '0.5rem',

                },
              }}
            >
              <Box className={classes.formContainer}>
                <Box mt={2}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                    color="primary"
                  >

                    Apply for a position
                  </Typography>
                </Box>
                <Box mt={2} width="100%">
                  <Typography variant="body1" color="primary" loading={loading}>
                    {state.position}
                  </Typography>
                </Box>
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold' }}
                    color="primary"
                  >
                    ABOUT ME
                  </Typography>
                </Box>
                <Box mt={2} width="100%">
                  <Typography variant="body1" color="primary" loading={loading}>
                    {aboutMe}
                  </Typography>
                </Box>
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    PERSONAL INFORMATION
                  </Typography>
                </Box>
                <Box
                  sx={{ mt: 2, display: 'flex' }}
                  width="100%"
                >
                  <Box display="flex" width="100%" alignItems="center">
                    <Box>
                      <Typography variant="body1" color="primary">
                        First name :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {_startCase(firstName)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" width="100%" alignItems="center">
                    <Box>
                      <Typography variant="body1" color="primary">
                        Last name :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {_startCase(lastName)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Box display="flex" width="100%" alignItems="center">
                    <Box>
                      <Typography variant="body1" color="primary">
                        Date of Birth :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {format(
                          new Date(_get(birthday, '', new Date())),
                          'dd/MM/yyyy',
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" width="100%" alignItems="center">
                    <Box>
                      <Typography variant="body1" color="primary">
                        Age :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      {' '}
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {`${age} years old`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Box display="flex" width="100%" alignItems="center">
                    <Box>
                      <Typography variant="body1" color="primary">
                        Gender :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {gender}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" width="100%" alignItems="center">
                    <Box>
                      <Typography variant="body1" color="primary">
                        Mariital :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {marital}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Box display="flex" width="100%" alignItems="center">
                    <Box minWidth="70px">
                      <Typography variant="body1" color="primary">
                        Address :
                      </Typography>
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography
                        variant="body1"
                        color="primary"
                        loading={loading}
                      >
                        {address}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ลักษณะงานที่สนใจ
                  </Typography>
                </Box>
                {_map(interestedJob, (data, i) => (
                  <Box
                    key={`interest_${i}`}
                    display="flex"
                    alignItems="center"
                    mt={2}
                  >
                    <Box>
                      {!loading && <Typography variant="body1">-</Typography>}
                    </Box>
                    <Box ml={1} minWidth={60}>
                      <Typography variant="body1" loading={loading}>
                        {data}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    การศึกษา
                  </Typography>
                </Box>
                {_map(education, (data, i) => (
                  <Box
                  // mt={2}
                    key={`education_${i}`}
                    width="100%"
                    paddingY={2}
                    sx={{
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <Typography variant="h6" color="primary" loading={loading}>
                      {`${data.major} (${data.education})`}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                    >
                      <Box display="flex" alignItems="center">
                        <Box>
                          {!loading && (
                          <SchoolIcon
                            sx={{ color: 'secondary.hard' }}
                            fontSize="small"
                          />
                          )}
                        </Box>
                        <Box ml={1} minWidth={60}>
                          <Typography
                            variant="body2"
                            sx={{ color: 'secondary.hard' }}
                            loading={loading}
                          >
                            {data.university}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" gap={1} alignItems="center">
                        <Box>
                          {!loading && (
                          <CalendarTodayIcon
                            fontSize="small"
                            sx={{ color: 'secondary.hard' }}
                          />
                          )}
                        </Box>
                        <Box minWidth={60}>
                          <Typography
                            variant="body2"
                            sx={{ color: 'secondary.hard' }}
                            loading={loading}
                          >
                            {`${format(
                              new Date(_get(data, 'start', new Date())),
                              'yyyy',
                            )} - ${format(
                              new Date(_get(data, 'end', new Date())),
                              'yyyy',
                            )}
                        `}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ประสบการณ์การทำงาน
                  </Typography>
                </Box>
                {_map(experience, (data, i) => (
                  <Box
                    key={`experience_${i}`}
                  // mt={2}
                    width="100%"
                    paddingY={2}
                    sx={{
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <Box minWidth={60}>
                      <Typography variant="h6" color="primary" loading={loading}>
                        {data.position}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                    >
                      <Box display="flex" alignItems="center">
                        <Box>
                          {!loading && (
                          <BusinessIcon
                            sx={{ color: 'secondary.hard' }}
                            fontSize="sm
                          all"
                          />
                          )}
                        </Box>
                        <Box ml={1} minWidth={60}>
                          <Typography
                            variant="body2"
                            sx={{ color: 'secondary.hard' }}
                            loading={loading}
                          >
                            {_startCase(data.company)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" gap={1} alignItems="center">
                        <Box>
                          {!loading && (
                          <CalendarTodayIcon
                            fontSize="small"
                            sx={{ color: 'secondary.hard' }}
                          />
                          )}
                        </Box>
                        <Box minWidth={60}>
                          <Typography
                            variant="body2"
                            sx={{ color: 'secondary.hard' }}
                            loading={loading}
                          >
                            {`${format(
                              new Date(_get(data, 'start', new Date())),
                              'MMM, yyyy',
                            )} - ${format(
                              new Date(_get(data, 'end', new Date())),
                              'MMM, yyyy',
                            )}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ทักษะความสามารถ
                  </Typography>
                </Box>
                <Box mt={2} display="flex" gap={1}>
                  {loading ? (
                    <Box width="100%">
                      <Skeleton variant="text" size={40} />
                    </Box>
                  ) : (
                    _map(skill, (data) => <Chip label={data} color="primary" />)
                  )}
                </Box>

                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ผลงาน
                  </Typography>
                </Box>
                <Box mt={2}>
                  <ImgListSkill imgList={image} loading={loading} />
                </Box>
                <Box mt={8}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    เอกสารเพิ่มเติม
                  </Typography>
                </Box>

                <Box mt={2} className={classes.fileBx}>
                  {loading ? (
                    <Box width="100%" minWidth={100}>
                      <Skeleton variant="rectangle" />
                    </Box>
                  ) : _map(otherFile, (file, i) => (
                    <Box key={file.id}>
                      <Box
                        className={classes.fileList}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => window.open(file.fileUrl)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box className={classes.pdfImage}>
                            <img src={pdfImage} alt="pdf" />
                          </Box>
                          <Box>
                            <Typography className={classes.cropText}>
                              {file.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: '#939393' }}
                            >
                              {bytesToSize(file.size)}
                            </Typography>
                          </Box>
                        </Box>

                      </Box>
                    </Box>
                  ))}
                </Box>

              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer submitLabel="รอการติดต่อกลับ" submitFunc={() => handleSubmit('wait')} haveCancel cancelLabel="ปฏิเสธ" cancelFunc={() => handleSubmit('reject')} />
    </>
  )
}
export default UserApplication
