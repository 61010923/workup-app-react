import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import _get from 'lodash/get'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import _forIn from 'lodash/forIn'
import _includes from 'lodash/includes'
import userDetail from '../../redux/selector/user.selector'
import Textfield from '../../component/Textfield'
import AddOrRemoveInput from '../../component/AddOrRemoveInput'
import Profile from '../../component/CompanyProfile'
import ImageUploader from '../../component/ImageUploader'

const useStyles = makeStyles({
  container: {
    width: '75%',
    margin: '0 auto',
  },
})
function CompanyProfile() {
  const classes = useStyles()
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const [welfare, setWelfare] = useState([''])
  const [travel, setTravel] = useState([''])
  const [companyName, setCompanyName] = useState('')
  const [companyDetail, setCompanyDetail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [emailContact, setEmailContact] = useState('')
  const [img, setImg] = useState('')
  const [imgAbout, setImgAbout] = useState([])
  const [errorCheck, setErrorCheck] = useState([])
  const [loading, setLoading] = useState(false)
  const handleChangeText = (e, setValue) => {
    const data = e.target.value
    setValue(data)
  }
  const handleCheck = () => {
    const body = {
      welfare,
      travel,
      companyName,
      companyDetail,
      address,
      phone,
      emailContact,
      imgAbout,
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
      return false
    }
    return body
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
    setPhone(data.phoneNumber)

    setEmailContact(data.email)
    setAddress(data.address)
    setImgAbout(data.imgAbout)
  }
  const getAllData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/companyProfile/profile`, { headers: { authorization: userToken } })
      if (response.status === 200) {
        setData(_get(response, 'data.data'))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllData()
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
        <Profile />
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
              // loading
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
              // loading
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
              // loading
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
              value={phone}
              onChange={(e) => handleChangeText(e, setPhone)}
              error={_includes(errorCheck, 'phone') && _isEmpty(phone)}
              // loading
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
                _includes(errorCheck, 'emailContact') && _isEmpty(companyName)
              }
              // loading
              value={emailContact}
              onChange={(e) => handleChangeText(e, setEmailContact)}
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

          <Button
            sx={{ mt: 2 }}
            onClick={handleCheck}
            fullWidth
            variant="contained"
          >
            save
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CompanyProfile
