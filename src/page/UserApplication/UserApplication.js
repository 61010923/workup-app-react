import React, { useState, useEffect } from 'react'
import { Box, Button, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import EmailIcon from '@mui/icons-material/Email'
import _isEmpty from 'lodash/isEmpty'
import _isDate from 'lodash/isDate'
import _map from 'lodash/map'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import _every from 'lodash/every'
import InputAdornment from '@mui/material/InputAdornment'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import Typography from '../../component/Typography'
import Footer from '../../component/Footer'
import ImageUploader from '../../component/ImageUploader'
import AddOrRemoveEducation from '../../component/AddOrRemoveEducation'
import AddOrRemoveInput from '../../component/AddOrRemoveInput'
import UserProfile from '../../component/UserProfile'
import userDetail from '../../redux/selector/user.selector'
import { alertBar } from '../../redux/action/alert.action'
import TagField from '../../component/TagField'

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
  const [loading, setLoading] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [openSkeleton, setOpenSkeleton] = useState(true)
  const [responsible, setResponsible] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const newDate = new Date()
  const newDateMax = new Date()
  const decreaseDateMin = new Date(
    newDate.setFullYear(newDate.getFullYear() - 60),
  )
  const decreaseDateMax = new Date(
    newDateMax.setFullYear(newDateMax.getFullYear() - 15),
  )
  const dispatch = useDispatch()
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const emailValidate = (e) => {
    const re = /\S+@\S+\.\S+/
    return re.test(e)
  }
  const checkEmail = (e) => {
    let errorMessage = ''
    if (openError && !emailValidate(email)) {
      errorMessage = 'please check email'
    }
    if (openError && _isEmpty(email)) {
      errorMessage = 'please fill email'
    }
    return errorMessage
  }
  const handleChange = (e, setValue) => {
    const { value } = e.target
    setValue(value)
  }
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  const handleChangeMarital = (event) => {
    setMarital(event.target.value)
  }
  const handleSubmit = async () => {
    setLoading(true)
    setOpenError(true)
    if (
      !_isEmpty(email)
      && emailValidate(email)
      && !_isEmpty(firstName)
      && !_isEmpty(lastName)
      && !_isEmpty(birthday)
      && !_isEmpty(gender)
      && !_isEmpty(marital)
      && !_isEmpty(address)
      && !_isEmpty(aboutMe)
      && !_isEmpty(responsible)
      && !_isEmpty(city)
      && !_isEmpty(phone)
      && _every(interestedJob, (item) => item.length > 0)
      && _every(
        education,
        (item) => item.education.length > 0
          && item.major.length > 0
          && item.university.length > 0,
      )
      && !_isEmpty(skill)
      && _every(image, (item) => item.length > 0)
    ) {
      const body = {
        email,
        firstName,
        lastName,
        birthDate: new Date(birthday).toISOString(),
        gender,
        marital,
        address,
        interestedJob,
        education,
        pastWork: skill,
        pastWorkImg: image,
        imgProfile: profile,
        aboutMe,
        city,
        responsible,
        phone,
      }
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/userProfile/profile`,
          body,
          {
            headers: {
              authorization: userToken,
              'Content-type': 'application/json',
            },
          },
        )
        if (response.status === 201 || response.status === 200) {
          // history('/login/verify-account')

          dispatch(alertBar(true, 'success', 3000, 'Update Complete'))
          setLoading(false)
          setOpenError(false)
          // setInterval(() => {
          //   window.location.reload()
          // }, 3000)
        }
      } catch (error) {
        dispatch(alertBar(true, 'warning', 3000, 'Something went wrong'))
        setLoading(false)
        console.log(error)
      }
    } else {
      dispatch(alertBar(true, 'warning', 3000, 'Please fill all the fields'))
      setLoading(false)
    }
  }
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
    setGender(data.gender)
    setMarital(data.marital)
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
    setImage(data.pastWorkImg)
    setProfile(data.imgProfile)
  }
  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/userProfile/getUserProfile`,
        {
          headers: {
            authorization: userToken,
          },
        },
      )
      if (response.status === 200 || response.status === 201) {
        setBody(_get(response, 'data.data'))
        setOpenSkeleton(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (e) => {
    console.log(e.target.file)
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box className={classes.container}>
      <Grid container width="100%" height="100%">
        <Grid item md={3} xs={12}>
          <Box
            color="primary"
            sx={{
              backgroundColor: 'rgb(248 248 248)',
              borderRadius: '2px 0 0 0',
              // border: 'solid 2px',
              // boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',
              width: '100%',
              height: '100%',
            }}
          >
            <UserProfile
              loading={openSkeleton}
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
                <EmailIcon color="primary" />
                <Box ml={2}>
                  <Typography variant="body1" color="primary">
                    mock@gmail.com
                  </Typography>
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                className={classes.borderBox}
              >
                <PhoneIcon fontSize="small" color="primary" />
                <Box ml={2}>
                  <Typography variant="body1">08569879875</Typography>
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                className={classes.borderBox}
              >
                <LocationOnIcon fontSize="small" color="primary" />
                <Box ml={2}>
                  <Typography variant="body1">BKK</Typography>
                </Box>
              </Box>
              {/* <TextField
                  loading={openSkeleton}
                  required
                  variant="standard"
                  id="demo-helper-text-aligned"
                  label="Email"
                  value={email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={
                    (openError && !emailValidate(email))
                    || (openError && _isEmpty(email))
                  }
                  helperText={checkEmail(email)}
                  onChange={(e) => {
                    handleChange(e, setEmail)
                  }}
                  autoComplete="off"
                  fullWidth
                /> */}
              {/* </Box> */}
              {/* <Box mt={2}>
                <TextField
                  loading={openSkeleton}
                  required
                  variant="standard"
                  id="demo-helper-text-aligned"
                  label="โทรศัพท์"
                  value={phone}
                  error={openError && _isEmpty(phone)}
                  helperText={
                    openError && _isEmpty(phone) && 'please fill phone'
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleChange(e, setPhone)
                  }}
                  autoComplete="off"
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  loading={openSkeleton}
                  required
                  variant="standard"
                  id="demo-helper-text-aligned"
                  label="จังหวัด / เมือง"
                  value={city}
                  error={openError && _isEmpty(city)}
                  helperText={openError && _isEmpty(city) && 'please fill city'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleChange(e, setCity)
                  }}
                  autoComplete="off"
                  fullWidth
                />
              </Box> */}
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
            }}
          >
            <Box className={classes.formContainer}>
              <Box mt={2}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold' }}
                  color="primary"
                >
                  ABOUT ME
                </Typography>
              </Box>
              <Box mt={2} width="100%">
                <Typography variant="body1" color="primary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Repellendus, exercitationem similique? Ipsum minus ab aut.
                  Nulla expedita ratione aperiam, repellat dolorem saepe ipsa.
                </Typography>
              </Box>
              {/* <Box mt={2} width="100%">
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  loading={openSkeleton}
                  label="About me"
                  value={aboutMe}
                  error={openError && _isEmpty(aboutMe)}
                  helperText={
                    openError && _isEmpty(aboutMe)
                      ? 'Please fill About me'
                      : 'Explain Yourself'
                  }
                  onChange={(e) => {
                    handleChange(e, setAboutMe)
                  }}
                />
              </Box> */}
              <Box mt={8}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  PERSONAL INFORMATION
                </Typography>
              </Box>
              {/* <TextField
            loading={openSkeleton}
            required
            variant="standard"
            id="demo-helper-text-aligned"
            label="Email"
            value={email}
            error={
              (openError && !emailValidate(email))
              || (openError && _isEmpty(email))
            }
            helperText={checkEmail(email)}
            onChange={(e) => {
              handleChange(e, setEmail)
            }}
            autoComplete="off"
            fullWidth
          /> */}
              <Box
                sx={{ mt: 2, display: 'flex' }}
                width="100%" // justifyContent="space-between"
              >
                <Box display="flex" width="100%">
                  <Box>
                    <Typography variant="body1" color="primary">
                      First name :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      Vanakorn
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" width="100%">
                  <Box>
                    <Typography variant="body1" color="primary">
                      Last name :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      Inyai
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: 'flex' }}>
                <Box display="flex" width="100%">
                  <Box>
                    <Typography variant="body1" color="primary">
                      Date of Birth :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      3/10/2022
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" width="100%">
                  <Box>
                    <Typography variant="body1" color="primary">
                      Age :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      22 years old
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: 'flex' }}>
                <Box display="flex" width="100%">
                  <Box>
                    <Typography variant="body1" color="primary">
                      Gender :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      Male
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" width="100%">
                  <Box>
                    <Typography variant="body1" color="primary">
                      Mariital :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      Single
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box display="flex" width="100%">
                  <Box minWidth="70px">
                    <Typography variant="body1" color="primary">
                      Address :
                    </Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1" color="primary">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Facere tempore rerum sunt quis voluptates fugiat facilis
                      dolor! Sit quas rerum nihil quod provident?
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
              {_map(['Hi', 'YO'], (data, i) => (
                <Box key={`interest_${i}`} display="flex" mt={2}>
                  <Box>
                    <Typography variant="body1">-</Typography>
                  </Box>
                  <Box ml={1}>
                    <Typography variant="body1">{data}</Typography>
                  </Box>
                </Box>
              ))}
              <Box mt={8}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  การศึกษา

                </Typography>
              </Box>
              {/* <AddOrRemoveInput
                loading={openSkeleton}
                error={openError}
                keyText="interestedJob"
                label="Interested Job"
                state={interestedJob}
                setState={setInterestedJob}
              /> */}
              {/* <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                การศึกษา
              </Typography>
              <AddOrRemoveEducation
                loading={openSkeleton}
                error={openError}
                state={education}
                setState={setEducation}
              /> */}
              <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                ความสามารถ/ผลงาน
              </Typography>
              {/* <AddOrRemoveInput
            loading={openSkeleton}
            error={openError}
            keyText='skill'
            label='Skill/Past work'
            state={skill}
            setState={setSkill}
          /> */}
              <Box mt={2}>
                <TagField
                  label="Skill"
                  state={skill}
                  setState={setSkill}
                  error={openError && _isEmpty(skill)}
                  loading={openSkeleton}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <ImageUploader
                  loading={openSkeleton}
                  error={openError}
                  state={image}
                  setState={setImage}
                />
              </Box>
              <input type="file" onChange={handleFileChange} />
              {/* <Button
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit()}
            disabled={loading}
            fullWidth
            variant="contained"
          >
            save
          </Button> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
export default UserApplication
