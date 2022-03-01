import React, { useState, useEffect } from 'react'
import {
  Box, Button, TextField, MenuItem,
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
import ImageUploader from '../component/ImageUploader'
import AddOrRemoveEducation from '../component/AddOrRemoveEducation'
import AddOrRemoveInput from '../component/AddOrRemoveInput'
import UserProfile from '../component/UserProfile'
import userDetail from '../redux/selector/user.selector'

const useStyles = makeStyles({
  formContainer: {
    width: '90%',
    margin: '0 auto',
    padding: '2rem 0',

  },
  container: {
    display: 'flex',
    margin: '6rem 5rem',
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
  const newDate = new Date()
  const newDateMax = new Date()
  const decreaseDateMin = new Date(newDate.setFullYear(newDate.getFullYear() - 60))
  const decreaseDateMax = new Date(newDateMax.setFullYear(newDateMax.getFullYear() - 15))
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const [allData, setAllData] = useState({})
  const emailValidate = (e) => {
    const re = /\S+@\S+\.\S+/
    return re.test(e)
  }
  const checkEmail = (e) => {
    let errorMessage = ''
    if (loading && !emailValidate(email)) {
      errorMessage = 'please check email'
    }
    if (loading && _isEmpty(email)) {
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
    if (
      !_isEmpty(email) && emailValidate(email)
      // && !_isEmpty(firstName)
      // && !_isEmpty(lastName)
      // && !_isEmpty(birthday)
      // && !_isEmpty(gender)
      // && !_isEmpty(marital)
      // && !_isEmpty(address)
      // && !_isEmpty(interestedJob)
      // && !_isEmpty(education)
      // && !_isEmpty(skill)
      // && !_isEmpty(image)
      // && !_isEmpty(profile)
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
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    } else {
      setLoading(false)

      alert('null')
    }
  }
  const setBody = (data) => {
    setEmail(data.email)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setBirthday(data.birthDate)
    if (!_isEmpty(data.birthDate)) {
      setAge(CalculateAge(new Date(data.birthDate)))
    }
    setGender(data.gender)
    setMarital(data.marital)
    setAddress(data.address)
    setInterestedJob(data.interestedJob)
    setEducation(data.education)
    setSkill(data.skill)
    setImage(data.image)
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
        console.log(_get(response, 'data.data'))
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
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '5px 10px 15px rgba(0,0,0,0.5)',

      }}
      >
        <UserProfile data={allData} state={profile} setState={setProfile} />
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
            required
            id="demo-helper-text-aligned"
            label="Email"
            value={email}
            error={
          (loading && !emailValidate(email)) || (loading && _isEmpty(email))
        }
            helperText={checkEmail(email)}
            onChange={(e) => handleChange(e, setEmail)}
            autoComplete="off"
            fullWidth
          />
          <Box sx={{ mt: 2, display: 'flex' }}>
            <TextField
              required
              id="demo-helper-text-aligned"
              label="Fist Name"
              value={firstName}
              error={loading && _isEmpty(firstName)}
              helperText={
                  loading && _isEmpty(firstName) && 'please fill First name'
                }
              onChange={(e) => handleChange(e, setFirstName)}
              autoComplete="off"
              fullWidth
            />
            <TextField
              sx={{ ml: 2 }}
              required
              id="demo-helper-text-aligned"
              label="Last Name"
              value={lastName}
              error={loading && _isEmpty(lastName)}
              helperText={
                  loading && _isEmpty(lastName) && 'please fill Last name'
                }
              onChange={(e) => handleChange(e, setLastName)}
              autoComplete="off"
              fullWidth
            />
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
                    {...params}
                    error={loading && !_isDate(birthday)}
                    helperText={
                    loading && !_isDate(birthday) && 'please select birthday'
                  }
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              sx={{ ml: 2 }}
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

          <Box sx={{ mt: 2, display: 'flex' }}>
            <TextField
              id="outlined-select-currency"
              select
              label="Gender"
              value={gender}
              error={loading && _isEmpty(gender)}
              helperText={
                  loading && _isEmpty(gender) && 'please select gender'
                }
              onChange={handleChangeGender}
        //   helperText="Please select your currency"
              fullWidth
            >
              {_map(genders, (option, index) => (
                <MenuItem key={`gender${index}`} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ ml: 2 }}
              id="outlined-select-currency"
              select
              label="Marital Status"
              value={marital}
              error={loading && _isEmpty(marital)}
              helperText={
                  loading && _isEmpty(marital) && 'please select marital'
                }
              onChange={handleChangeMarital}
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
          <TextField
            sx={{ mt: 2 }}
            required
            id="demo-helper-text-aligned"
            label="ที่อยู่ปัจจุบัน"
            value={address}
            error={loading && _isEmpty(address)}
            helperText={
                  loading && _isEmpty(address) && 'please fill address'
                }
            onChange={(e) => handleChange(e, setAddress)}
            autoComplete="off"
            fullWidth
          />
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
            ลักษณะงานที่สนใจ
          </Typography>
          <AddOrRemoveInput loading={loading} keyText="interestedJob" label="Interested Job" state={interestedJob} setState={setInterestedJob} />
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
            การศึกษา
          </Typography>
          <AddOrRemoveEducation loading={loading} state={education} setState={setEducation} />
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
            ความสามารถ/ผลงาน
          </Typography>
          <AddOrRemoveInput loading={loading} keyText="skill" label="Skill/Past work" state={skill} setState={setSkill} />

          <Box sx={{ mt: 2 }}>
            <ImageUploader loading={loading} state={image} setState={setImage} />
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
