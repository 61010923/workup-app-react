import React, { useState, useEffect } from 'react'
import {
  Box, Button, MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  format, formatDistance, formatRelative, subDays,
} from 'date-fns'
import _isEmpty from 'lodash/isEmpty'
import _isDate from 'lodash/isDate'
import _map from 'lodash/map'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import _every from 'lodash/every'
import ImageUploader from '../component/ImageUploader'
import AddOrRemoveEducation from '../component/AddOrRemoveEducation'
import AddOrRemoveInput from '../component/AddOrRemoveInput'
import UserProfile from '../component/UserProfile'
import userDetail from '../redux/selector/user.selector'
import { alertBar } from '../redux/action/alert.action'
import TextField from '../component/Textfield'

const useStyles = makeStyles({
  formContainer: {
    width: '90%',
    margin: '0 auto',
    padding: '2rem 0',

  },
  container: {
    display: 'flex',
    margin: '6rem 3rem',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})
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
function CalculateAge(birthday) { // birthday is a date
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
  const [education, setEducation] = useState([{ education: '', major: '', university: '' }])
  const [skill, setSkill] = useState([''])
  const [image, setImage] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [openSkeleton, setOpenSkeleton] = useState(true)
  const newDate = new Date()
  const newDateMax = new Date()
  const decreaseDateMin = new Date(newDate.setFullYear(newDate.getFullYear() - 60))
  const decreaseDateMax = new Date(newDateMax.setFullYear(newDateMax.getFullYear() - 15))
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
      !_isEmpty(email) && emailValidate(email)
      && !_isEmpty(firstName)
      && !_isEmpty(lastName)
      && !_isEmpty(birthday)
      && !_isEmpty(gender)
      && !_isEmpty(marital)
      && !_isEmpty(address)
      && _every(interestedJob, (item) => item.length > 0)
      && _every(education, (item) => item.education.length > 0 && item.major.length > 0 && item.university.length > 0)
      && _every(skill, (item) => item.length > 0)
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
      }
      try {
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/userProfile/profile`, body, {
          headers: {
            authorization: userToken,
            'Content-type': 'application/json',
          },
        })
        if (response.status === 201 || response.status === 200) {
          // history('/login/verify-account')
          dispatch(alertBar(true, 'success', 3000, 'Update Complete'))
          setLoading(false)
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
        setOpenSkeleton(true)
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
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)',
        borderRadius: 2,
        boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',

      }}
      >
        <UserProfile loading={openSkeleton} data={{ firstName, lastName, emailAuth }} state={profile} setState={setProfile} />
      </Box>
      <Box sx={{
        backgroundColor: 'rgb(248 248 248)',
        borderRadius: 2,
        mt: 3,
        boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',

      }}
      >
        <Box className={classes.formContainer}>
          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>
            PERSONAL INFORMATION
          </Typography>
          <TextField
            loading={openSkeleton}
            required
            id="demo-helper-text-aligned"
            label="Email"
            value={email}
            error={
          (openError && !emailValidate(email)) || (openError && _isEmpty(email))
        }
            helperText={checkEmail(email)}
            onChange={(e) => {
              handleChange(e, setEmail)
            }}
            autoComplete="off"
            fullWidth
          />
          <Box sx={{ mt: 2, display: 'flex' }}>
            <TextField
              loading={openSkeleton}
              required
              id="demo-helper-text-aligned"
              label="Fist Name"
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
                    error={openError && _isEmpty(birthday)}
                    helperText={
                    openError && _isEmpty(birthday) && 'please select birthday'
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
          <AddOrRemoveInput loading={openSkeleton} error={openError} keyText="interestedJob" label="Interested Job" state={interestedJob} setState={setInterestedJob} />
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
            การศึกษา
          </Typography>
          <AddOrRemoveEducation loading={openSkeleton} error={openError} state={education} setState={setEducation} />
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
            ความสามารถ/ผลงาน
          </Typography>
          <AddOrRemoveInput loading={openSkeleton} error={openError} keyText="skill" label="Skill/Past work" state={skill} setState={setSkill} />

          <Box sx={{ mt: 2 }}>
            <ImageUploader loading={openSkeleton} error={openError} state={image} setState={setImage} />
          </Box>
          <Button
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit()}
            disabled={loading}
            fullWidth
            variant="contained"
          >
            save

          </Button>

        </Box>
      </Box>
    </Box>

  )
}
export default PersonalTab
