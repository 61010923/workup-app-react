import React, { useState, useEffect } from 'react'
import {
  Box, Button, MenuItem, IconButton,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
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
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import PhoneIcon from '@mui/icons-material/Phone'
import Footer from '../../component/Footer'
import ImageUploader from '../../component/ImageUploader'
import AddOrRemoveEducation from '../../component/AddOrRemoveEducation'
import AddOrRemoveInput from '../../component/AddOrRemoveInput'
import UserProfile from '../../component/UserProfile'
import userDetail from '../../redux/selector/user.selector'
import { alertBar } from '../../redux/action/alert.action'
import TextField from '../../component/Textfield'
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
  multilineColor: {
    color: 'theme.palette.secondary.main',
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
function PersonalTab() {
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
  const [experience, setExperience] = useState([{
    position: '', company: '', start: null, end: null,
  }])
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
  const handleAddExperience = () => {
    const data = [...experience]
    data.push({
      experience: '', company: '', start: null, end: null,
    })
    setExperience(data)
  }
  const handleRemoveExperience = (i) => {
    const arr = [...experience]
    arr.splice(i, 1)
    setExperience(arr)
  }
  const handleInputChange = (e, index, type) => {
    if (type === 'start' || type === 'end') {
      const list = [...experience]
      list[index][type] = e
      setExperience(list)
    } else {
      const { name, value } = e.target
      const list = [...experience]
      list[index][type] = value
      setExperience(list)
    }
  }
  const handleSubmit = async () => {
    setLoading(true)
    setOpenError(true)
    if (
      !_isEmpty(email)
      && emailValidate(email)
      && !_isEmpty(firstName)
      && !_isEmpty(lastName)
      && !_isEmpty(new Date(birthday).toISOString())
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
        experience,
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
    if (!_isEmpty(data.experience)) {
      setExperience(data.experience)
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
              backgroundColor: 'primary.main',
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
              actionType="edit"
            />
            <Box margin={2} mx={3}>
              <Box>
                <TextField
                  loading={openSkeleton}
                  required
                  color="secondary"
                  sx={{ input: { color: 'secondary.main' } }}
                  variant="standard"
                  id="demo-helper-text-aligned"
                  label="Email"
                  value={email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="secondary" />
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
                />
              </Box>
              <Box mt={2}>
                <TextField
                  loading={openSkeleton}
                  required
                  color="secondary"
                  variant="standard"
                  id="demo-helper-text-aligned"
                  label="โทรศัพท์"
                  value={phone}
                  error={openError && _isEmpty(phone)}
                  helperText={
                    openError && _isEmpty(phone) && 'please fill phone'
                  }
                  sx={{ input: { color: 'secondary.main' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="secondary" />
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
                  color="secondary"
                  sx={{ input: { color: 'secondary.main' } }}
                  variant="standard"
                  id="demo-helper-text-aligned"
                  label="จังหวัด / เมือง"
                  value={city}
                  error={openError && _isEmpty(city)}
                  helperText={openError && _isEmpty(city) && 'please fill city'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleChange(e, setCity)
                  }}
                  autoComplete="off"
                  fullWidth
                />
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
            }}
          >
            <Box className={classes.formContainer}>
              <Box mt={2}>
                <Typography sx={{ fontWeight: 'bold' }}>ABOUT ME</Typography>
              </Box>
              <Box mt={2} width="100%">
                <TextField
                  fullWidth
                  label="Responsible"
                  onChange={(e) => handleChange(e, setResponsible)}
                  loading={openSkeleton}
                  error={openError && _isEmpty(responsible)}
                  helperText={
                    openError && _isEmpty(responsible)
                      ? 'Please fill responsible'
                      : 'Anything can explain your working'
                  }
                  value={responsible}
                />
              </Box>
              <Box mt={2} width="100%">
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
              </Box>
              <Box mt={2}>
                <Typography sx={{ fontWeight: 'bold', mb: 2 }}>
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
              <Box sx={{ mt: 2, display: 'flex' }}>
                <TextField
                  loading={openSkeleton}
                  required
                  id="demo-helper-text-aligned"
                  label="First Name"
                  value={firstName}
                  error={openError && _isEmpty(firstName)}
                  helperText={
                    openError && _isEmpty(firstName) && 'please fill First name'
                  }
                  onChange={(e) => {
                    handleChange(e, setFirstName)
                  }}
                  autoComplete="off"
                  fullWidth
                />

                <Box sx={{ ml: 2, width: '100%' }}>
                  <TextField
                    loading={openSkeleton}
                    required
                    id="demo-helper-text-aligned"
                    label="Last Name"
                    value={lastName}
                    error={openError && _isEmpty(lastName)}
                    helperText={
                      openError && _isEmpty(lastName) && 'please fill Last name'
                    }
                    onChange={(e) => {
                      handleChange(e, setLastName)
                    }}
                    autoComplete="off"
                    fullWidth
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: 'flex' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    fullWidth
                    label="Birthday"
                    value={birthday}
                    allowKeyboardControl="false"
                    InputProps={{ readOnly: true }}
                    autoComplete="off"
                    minDate={new Date(decreaseDateMin)}
                    maxDate={new Date(decreaseDateMax)}
                    onChange={(newValue) => {
                      setBirthday(newValue)
                      if (_isDate(newValue)) {
                        setAge(CalculateAge(newValue))
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        loading={openSkeleton}
                        {...params}
                        error={
                          openError
                          && _isEmpty(new Date(birthday).toISOString())
                        }
                        helperText={
                          openError
                          && _isEmpty(new Date(birthday).toISOString())
                          && 'please select birthday'
                        }
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
                <Box sx={{ ml: 2, width: '100%' }}>
                  <TextField
                    loading={openSkeleton}
                    required
                    type="number"
                    id="demo-helper-text-aligned"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Age"
                    value={age}
                    autoComplete="off"
                    fullWidth
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: 'flex' }}>
                <TextField
                  loading={openSkeleton}
                  id="outlined-select-currency"
                  select
                  label="Gender"
                  value={gender}
                  error={openError && _isEmpty(gender)}
                  helperText={
                    openError && _isEmpty(gender) && 'please select gender'
                  }
                  onChange={(e) => {
                    handleChangeGender(e)
                  }}
                  //   helperText="Please select your currency"
                  fullWidth
                >
                  {_map(genders, (option, index) => (
                    <MenuItem key={`gender${index}`} value={option.id}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ ml: 2, width: '100%' }}>
                  <TextField
                    loading={openSkeleton}
                    id="outlined-select-currency"
                    select
                    label="Marital Status"
                    value={marital}
                    error={openError && _isEmpty(marital)}
                    helperText={
                      openError && _isEmpty(marital) && 'please select marital'
                    }
                    onChange={(e) => {
                      handleChangeMarital(e)
                    }}
                    autoComplete="off"
                    fullWidth
                  >
                    {_map(Maritals, (option, index) => (
                      <MenuItem key={`marital${index}`} value={option.id}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  loading={openSkeleton}
                  required
                  id="demo-helper-text-aligned"
                  label="ที่อยู่ปัจจุบัน"
                  value={address}
                  error={openError && _isEmpty(address)}
                  helperText={
                    openError && _isEmpty(address) && 'please fill address'
                  }
                  onChange={(e) => {
                    handleChange(e, setAddress)
                  }}
                  autoComplete="off"
                  fullWidth
                />
              </Box>
              <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                ลักษณะงานที่สนใจ
              </Typography>
              <AddOrRemoveInput
                loading={openSkeleton}
                error={openError}
                keyText="interestedJob"
                label="Interested Job"
                state={interestedJob}
                setState={setInterestedJob}
              />
              <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                การศึกษา
              </Typography>
              <AddOrRemoveEducation
                loading={openSkeleton}
                error={openError}
                state={education}
                setState={setEducation}
              />

              <Box mt={2}>
                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                  ประสบการณ์การทำงาน
                </Typography>
                {_map(experience, (data, i) => (
                  <Box display="flex" alignItems="center" width="100%">
                    {experience.length > 1 && (
                      <Box sx={{ mt: 2 }}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemoveExperience(i)}
                          color="error"
                        >
                          <RemoveCircleOutlineOutlinedIcon
                            sx={{ fontSize: '20px' }}
                          />
                        </IconButton>
                      </Box>
                    )}
                    <Box display="flex" flexDirection="column" width="100%">
                      <Box display="flex" mt={2} sx={{ gap: 2 }}>
                        <Box width="100%">
                          <TextField
                            fullWidth
                            label="ตำแหน่งหน้าที่"
                            value={data.position}
                            onChange={(e) => handleInputChange(e, i, 'position')}
                            error={openError && _isEmpty(data.position)}
                            helperText={
                              openError
                              && _isEmpty(data.position)
                              && 'please fill position'
                            }
                          />
                        </Box>
                        <Box width="100%">
                          <TextField
                            fullWidth
                            label="บริษัท"
                            value={data.company}
                            onChange={(e) => handleInputChange(e, i, 'company')}
                            error={openError && _isEmpty(data.company)}
                            helperText={
                              openError
                              && _isEmpty(data.company)
                              && 'please fill company'
                            }
                          />
                        </Box>
                      </Box>
                      <Box mt={2} width="100%">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                            <DatePicker
                              views={['year']}
                              label="Start"
                              name="start"
                              value={data.start}
                              onChange={(e) => handleInputChange(e, i, 'start')}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  helperText={
                                    openError
                                    && _isEmpty(
                                      new Date(data.end).toISOString(),
                                    )
                                    && 'please fill end'
                                  }
                                  error={
                                    openError
                                    && _isEmpty(new Date(data.end).toISOString())
                                  }
                                />
                              )}
                            />
                            <DatePicker
                              views={['year']}
                              label="End"
                              name="end"
                              value={data.end}
                              onChange={(e) => handleInputChange(e, i, 'end')}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  helperText={
                                    openError
                                    && _isEmpty(
                                      new Date(data.end).toISOString(),
                                    )
                                    && 'please fill end'
                                  }
                                  error={
                                    openError
                                    && _isEmpty(new Date(data.end).toISOString())
                                  }
                                />
                              )}
                            />
                          </Box>
                        </LocalizationProvider>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box>
                  <Button
                    sx={{ mt: 1, ml: '3px', textTransform: 'none' }}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={handleAddExperience}
                    variant="text"
                    color="success"
                  >
                    เพิ่ม Experience
                  </Button>
                </Box>
              </Box>
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

      <Footer submitFunc={handleSubmit} loading={loading} />
    </Box>
  )
}
export default PersonalTab
