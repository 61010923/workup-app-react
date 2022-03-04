import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import _get from 'lodash/get'
import { makeStyles } from '@mui/styles'
import { AppBar, Typography } from '@mui/material'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import _forIn from 'lodash/forIn'
import _includes from 'lodash/includes'
import userDetail from '../../redux/selector/user.selector'
import Textfield from '../../component/Textfield'
import AddOrRemoveInput from '../../component/AddOrRemoveInput'
import Profile from '../../component/CompanyProfile'
import ImageUploader from '../../component/ImageUploader'
import { alertBar } from '../../redux/action/alert.action'
import Footer from '../../component/Footer'

const useStyles = makeStyles({
  container: {
    width: '75%',
    margin: '0 auto',
  },
})
function CompanyProfile() {
  const classes = useStyles()
  const user = useSelector(userDetail)
  const dispatch = useDispatch()
  const userToken = _get(user, 'userDetail.userToken')
  const [welfare, setWelfare] = useState([''])
  const [travel, setTravel] = useState([''])
  const [companyName, setCompanyName] = useState('')
  const [companyDetail, setCompanyDetail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [imgProfile, setImgProfile] = useState('')
  const [imgAbout, setImgAbout] = useState([])
  const [errorCheck, setErrorCheck] = useState([])
  const [imgCover, setImgCover] = useState('')
  const [loading, setLoading] = useState(false)
  const [btLoading, setBtLoading] = useState(false)

  const handleChangeText = (e, setValue) => {
    const data = e.target.value
    setValue(data)
  }
  const handleSubmit = async (body) => {
    setBtLoading(true)
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/companyProfile/profile`, body, { headers: { authorization: userToken, 'Content-type': 'application/json' } })
      if (response.status === 200 || response.status === 201) {
        dispatch(alertBar(true, 'success', 3000, 'Update Complete'))
        setBtLoading(false)
      }
    } catch (error) {
      console.log(error)
      dispatch(alertBar(true, 'error', 3000, 'Something went wrong'))
      setBtLoading(false)
    }
  }
  const handleCheck = () => {
    const body = {
      welfare,
      travel,
      companyName,
      companyDetail,
      address,
      phoneNumber,
      email,
      imgCover,
      imgProfile,
      // imgAbout,
    }
    const arrErr = []
    _forIn(body, (value, key) => {
      if (_isEmpty(value) && !_isArray(value)) {
        arrErr.push(key)
      } else if (_isArray(value)) {
        const myarr = value.map((data) => (!!_isEmpty(data)))
        const checkarr = _includes(myarr, true)
        if (checkarr) {
          arrErr.push(key)
        }
      }
    })
    if (!_isEmpty(arrErr)) {
      setErrorCheck({ ...arrErr })
      dispatch(alertBar(true, 'error', 3000, 'Please fill all Field'))
    } else {
      body.imgAbout = imgAbout
      body.detail = companyDetail
      handleSubmit(body)
    }
  }
  const setData = (data) => {
    if (!_isEmpty(data.welfare)) {
      setWelfare(data.welfare)
    }
    if (!_isEmpty(data.travel)) {
      setTravel(data.travel)
    }
    setCompanyName(data.companyName)
    setCompanyDetail(data.detail)
    setPhoneNumber(data.phoneNumber)
    setImgProfile(data.imgProfile)
    setEmail(data.email)
    setAddress(data.address)
    setImgAbout(data.imgAbout)
    setImgCover(data.imgCover)
  }
  const getAllData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/companyProfile/profile`, { headers: { authorization: userToken } })
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
    getAllData()
    setErrorCheck({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box
        sx={{
          border: '3px solid #F5F5F5 ',
          borderRadius: '4px',
        }}
      >
        <Profile
          loading={loading}
          name={companyName}
          imgProfile={imgProfile}
          setImgProfile={setImgProfile}
          imgCover={imgCover}
          setImgCover={setImgCover}
          email={email}
          haveEmail
          actionType="edit"
        />
      </Box>
      <Box>
        <Box className={classes.container}>
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              ข้อมูลบริษัท
            </Typography>
          </Box>
          <Box mt={3}>
            <Textfield
              required
              label="Company Name"
              fullWidth
              value={companyName}
              onChange={(e) => handleChangeText(e, setCompanyName)}
              loading={loading}
              helperText={
                _includes(errorCheck, 'companyName')
                && _isEmpty(companyName)
                && 'Please fill Company Name'
              }
              error={
                _includes(errorCheck, 'companyName') && _isEmpty(companyName)
              }
            />
          </Box>
          <Box mt={2}>
            <Textfield
              label="รายละเอียดเกี่ยวกับบริษัทและการดำเนินกิจการ"
              multiline
              rows={5}
              fullWidth
              value={companyDetail}
              onChange={(e) => handleChangeText(e, setCompanyDetail)}
              error={
                _includes(errorCheck, 'companyDetail')
                && _isEmpty(companyDetail)
              }
              helperText={
                _includes(errorCheck, 'companyDetail')
                && _isEmpty(companyDetail)
                && 'Please fill Company Detail'
              }
              loading={loading}
              height={112}
            />
          </Box>
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              สวัสดิการ
            </Typography>
          </Box>
          <Box mt={3}>
            <AddOrRemoveInput
              label="สวัสดิการ"
              state={welfare}
              setState={setWelfare}
              error={_includes(errorCheck, 'welfare')}
              loading={loading}
              key="welfare"
            />
          </Box>
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              ที่อยู่
            </Typography>
          </Box>
          <Box mt={3}>
            <Textfield
              label="ที่อยู่"
              multiline
              rows={3}
              fullWidth
              value={address}
              onChange={(e) => handleChangeText(e, setAddress)}
              error={_includes(errorCheck, 'address') && _isEmpty(address)}
              helperText={
                _includes(errorCheck, 'address')
                && _isEmpty(address)
                && 'Please fill Address'
              }
              loading={loading}
              height={112}
            />
          </Box>
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              ติดต่อ
            </Typography>
          </Box>
          <Box mt={3}>
            <Textfield
              type="number"
              className={classes.input}
              value={phoneNumber}
              onChange={(e) => handleChangeText(e, setPhoneNumber)}
              error={_includes(errorCheck, 'phoneNumber') && _isEmpty(phoneNumber)}
              helperText={
                _includes(errorCheck, 'phoneNumber')
                && _isEmpty(phoneNumber)
                && 'Please fill Phone Number'
              }
              loading={loading}
              required
              id="demo-helper-text-aligned"
              label="โทรศัพท์"
              autoComplete="off"
              fullWidth
            />
          </Box>
          <Box mt={2}>
            <Textfield
              required
              id="demo-helper-text-aligned"
              label="อีเมลติดต่อ"
              autoComplete="off"
              fullWidth
              error={
                _includes(errorCheck, 'email') && _isEmpty(email)
              }
              helperText={
                _includes(errorCheck, 'email')
                && _isEmpty(email)
                && 'Please fill Contact'
              }
              loading={loading}
              value={email}
              onChange={(e) => handleChangeText(e, setEmail)}
            />
          </Box>
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              การเดินทาง
            </Typography>
          </Box>
          <Box mt={3}>
            <AddOrRemoveInput
              label="การเดินทาง"
              state={travel}
              setState={setTravel}
              error={_includes(errorCheck, 'travel')}
              loading={loading}
            />
          </Box>
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              รูปเพิ่มเติม
            </Typography>
          </Box>
          <Box mt={3}>
            <ImageUploader state={imgAbout} setState={setImgAbout} />
          </Box>
          {/*
          <Button
            sx={{ mt: 2 }}
            onClick={handleCheck}
            fullWidth
            variant="contained"
            disabled={btLoading}
          >
            save
          </Button> */}
        </Box>
      </Box>
      <Footer
        submitFunc={handleCheck}
        loading={btLoading}
      />
    </>
  )
}

export default CompanyProfile
