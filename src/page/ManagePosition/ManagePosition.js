import React, { useState, useEffect } from 'react'
import {
  Box, Typography,
  Button, Modal, MenuItem,
  IconButton,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import _every from 'lodash/every'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import _isNumber from 'lodash/isNumber'
import AddOrRemoveInput from '../../component/AddOrRemoveInput'
import TextField from '../../component/Textfield'
import userDetail from '../../redux/selector/user.selector'
import { alertBar } from '../../redux/action/alert.action'
import Switch from '../../component/Switch'

const useStyles = makeStyles({

})
const styleModal = {
  display: 'flex',
  justifyContent: 'center',
  bgcolor: 'background.paper',

}
const jobTypeArray = [
  {
    id: 'Law',
    value: 'กฎหมาย',
  },
  {
    id: 'Market',
    value: 'การตลาด',
  },
  {
    id: 'Agriculture',
    value: 'เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่',
  },
  {
    id: 'Sale',
    value: 'ขาย',
  },
  {
    id: 'Drawing',
    value: 'เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม',
  },
  {
    id: 'Computer',
    value: 'คอมพิวเตอร์/IT/โปรแกรมเมอร์',
  },
  {
    id: 'Finance_Banking',
    value: 'งานการเงิน-ธนาคาร',
  },
  {
    id: 'Stock',
    value: 'งานขนส่ง-คลังสินค้า',
  },
  {
    id: 'BOI',
    value: 'งานนำเข้า-ส่งออก',
  },
  {
    id: 'Relation',
    value: 'งานบริการลูกค้า-Call Center',
  },
  {
    id: 'Account',
    value: 'งานบัญชี',
  },
  {
    id: 'Acting',
    value: 'งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume',
  },
  {
    id: 'Ga',
    value: 'จัดซื้อ/ธุรการ/ประสานงานทั่วไป',
  },
  {
    id: 'Safety',
    value: 'เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO',
  },
  {
    id: 'Technical',
    value: 'ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์',
  },
  {
    id: 'Writer',
    value: 'นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา',
  },
  {
    id: 'Human',
    value: 'บุคคล/ฝึกอบรม',
  },
  {
    id: 'Qc',
    value: 'ผลิต/ควบคุมคุณภาพ/โรงงาน',
  },
  {
    id: 'Manager',
    value: 'ผู้จัดการ/ผู้อำนวยการ/MD/CEO',
  },
  {
    id: 'Security',
    value: 'แผนกรักษาความปลอดภัย/งานอาคารจอดรถ',
  },
  {
    id: 'Doctor',
    value: 'แพทย์/เภสัชกร/สาธารณสุข',
  },
  {
    id: '41',
    value: 'ภูมิศาสตร์/แผนที่/GIS/ผังเมือง',
  },
  {
    id: 'HouseKeeper',
    value: 'แม่บ้าน/พี่เลี้ยง/คนสวน',
  },
  {
    id: 'Civil',
    value: 'โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา',
  },
  {
    id: 'GUIDE',
    value: 'ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว',
  },
  {
    id: 'Secretary',
    value: 'เลขานุการ',
  },
  {
    id: 'Chemical',
    value: 'วิทยาศาสตร์/Lab/วิจัยพัฒนา',
  },
  {
    id: 'Engineer',
    value: 'วิศวกร',
  },
  {
    id: 'ECONOMIC',
    value: 'วิจัย / วิเคราะห์ ( เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร )',
  },
  {
    id: 'Ads',
    value: 'ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ',
  },
  {
    id: 'Driver',
    value: 'ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์',
  },
  {
    id: 'MassComm',
    value: 'สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์',
  },
  {
    id: 'HealthCare',
    value: 'สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา',
  },
  {
    id: 'Garment',
    value: 'เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น',
  },
  {
    id: 'Web',
    value: 'ออกแบบเว็บไซต์/Web',
  },
  {
    id: 'Jew',
    value: 'อัญมณีและเครื่องประดับ',
  },
  {
    id: 'Teacher',
    value: 'อาจารย์/ครู/งานวิชาการ',
  },
  {
    id: 'COOK',
    value: 'อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ',
  },
  {
    id: 'Parttime',
    value: 'งาน Part-time/พนักงานชั่วคราว',
  },
  {
    id: 'Freelance',
    value: 'Freelance',
  },

]
function AddPosition({ id }) {
  const { state } = useLocation()
  const classes = useStyles()
  const navigate = useNavigate()
  const [jobType, setJobType] = useState('')
  const [position, setPosition] = useState('')
  const [positionTotal, setPositionTotal] = useState('')
  const [salary, setSalary] = useState('')
  const [role, setRole] = useState([''])
  const [location, setLocation] = useState('')
  const [property, setProperty] = useState([''])
  const [interview, setInterview] = useState('')
  const [announce, setAnnounce] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [openSkeleton, setOpenSkeleton] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  console.log(state)
  const handleChange = (e, setValue) => {
    const { value } = e.target
    if (setValue === setPositionTotal) {
      if (value < 0) {
        // eslint-disable-next-line no-const-assign
        value = 0
      } else {
        setValue(value)
      }
    } else {
      setValue(value)
    }
  }
  const handleCheckData = () => {
    if (_isEmpty(state)) {
      setOpenSkeleton(false)
    } else if (!_isEmpty(state)) {
      setJobType(state.jobType)
      setPosition(state.position)
      setPositionTotal(state.positionTotal)
      setSalary(state.salary)
      setRole(state.role)
      setLocation(state.location)
      setProperty(state.property)
      setInterview(state.interview)
      setAnnounce(state.isActive)
      setOpenSkeleton(false)
    }
  }
  const handleSubmit = async () => {
    setLoading(true)
    setOpenError(true)
    if (!_isEmpty(jobType)
      && !_isEmpty(position)
      && !_isEmpty(positionTotal.toString())
      && !_isEmpty(salary)
      && _every(role, (item) => item.length > 0)
      && !_isEmpty(location)
      && _every(property, (item) => item.length > 0)
      && !_isEmpty(interview)

    ) {
      const body = {
        jobType,
        position,
        positionTotal: Number(positionTotal),
        salary,
        role,
        location,
        property,
        interview,
        isActive: announce,
      }
      if (_isEmpty(state)) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/announcement`, body, {
            headers: {
              authorization: userToken,
              'Content-type': 'application/json',
            },
          })
          if (response.status === 201 || response.status === 200) {
            dispatch(alertBar(true, 'success', 3000, 'Add Complete'))
            setLoading(false)
            setInterval(() => {
              // navigate('/announcement')
              window.location.href = '/announcement'
            }, 3000)
          }
        } catch (error) {
          dispatch(alertBar(true, 'warning', 3000, 'Something went wrong'))
          setLoading(false)
          console.log(error)
        }
      } else {
        try {
          const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/announcement/company/${_get(state, '_id')}`, body, {
            headers: {
              authorization: userToken,
              'Content-type': 'application/json',
            },
          })
          if (response.status === 201 || response.status === 200) {
            dispatch(alertBar(true, 'success', 3000, 'Updated Complete'))
            setLoading(false)
          }
        } catch (error) {
          dispatch(alertBar(true, 'warning', 3000, 'Something went wrong'))
          setLoading(false)
          console.log(error)
        }
      }
    } else {
      dispatch(alertBar(true, 'warning', 3000, 'Please fill all the fields'))
      setLoading(false)
    }
  }
  useEffect(() => {
    handleCheckData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box sx={{
      // display: 'reletive',
      margin: ' 2rem 5rem',
    }}
    >

      <Button startIcon={<ArrowBackIcon />} onClick={() => window.history.back()}>
        back

      </Button>
      <Box sx={styleModal}>
        <Box>

          <Typography
            variant="h6"
            color="primary"
          >
            Manage Position
          </Typography>
          <TextField
            loading={openSkeleton}
            required
            sx={{ mt: 2 }}
            id="outlined-select-currency"
            select
            label="ประเภทงานหลัก"
            value={jobType}
            error={openError && _isEmpty(jobType)}
            helperText={
                  openError && _isEmpty(jobType) && 'please select job type'
                }
            onChange={(e) => {
              handleChange(e, setJobType)
            }}
            autoComplete="off"
            fullWidth
          >
            {_map(jobTypeArray, (option, index) => (
              <MenuItem key={`jobType${index}`} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            loading={openSkeleton}
            sx={{ mt: 2 }}
            required
            id="demo-helper-text-aligned"
            label="ตำแหน่ง"
            value={position}
            error={openError && _isEmpty(position)}
            helperText={
                  openError && _isEmpty(position) && 'please fill position'
                }
            onChange={(e) => {
              handleChange(e, setPosition)
            }}
            autoComplete="off"
            fullWidth
          />
          <TextField
            loading={openSkeleton}
            sx={{ mt: 2 }}
            type="number"
            required
            id="demo-helper-text-aligned"
            label="อัตราที่รับ"
            value={positionTotal}
            error={openError && _isEmpty(positionTotal.toString())}
            helperText={
                  openError && _isEmpty(positionTotal.toString()) && 'please fill positionTotal'
                }
            onChange={(e) => {
              handleChange(e, setPositionTotal)
            }}
            autoComplete="off"
            fullWidth
          />
          <TextField
            loading={openSkeleton}
            sx={{ mt: 2 }}
            required
            id="demo-helper-text-aligned"
            label="เงินเดือน"
            value={salary}
            error={openError && _isEmpty(salary)}
            helperText={
                  openError && _isEmpty(salary) && 'please fill salary'
                }
            onChange={(e) => {
              handleChange(e, setSalary)
            }}
            autoComplete="off"
            fullWidth
          />
          <TextField
            loading={openSkeleton}
            sx={{ mt: 2 }}
            required
            id="demo-helper-text-aligned"
            label="สถานที่ปฏิบัติงาน"
            value={location}
            error={openError && _isEmpty(location)}
            helperText={
                  openError && _isEmpty(location) && 'please fill location'
                }
            onChange={(e) => {
              handleChange(e, setLocation)
            }}
            autoComplete="off"
            fullWidth
          />
          <Typography
            variant="h6"
            color="primary"
            sx={{ mt: 2 }}
          >
            หน้าที่และรายละเอียดของงาน
          </Typography>
          <AddOrRemoveInput
            loading={openSkeleton}
            error={openError}
            keyText="role"
            label="หน้าที่และรายละเอียดของงาน"
            state={role}
            setState={setRole}
          />

          <Typography
            variant="h6"
            color="primary"
            sx={{ mt: 2 }}
          >
            คุณสมบัติผู้สมัคร
          </Typography>
          <AddOrRemoveInput
            loading={openSkeleton}
            error={openError}
            keyText="role"
            label="คุณสมบัติผู้สมัคร"
            state={property}
            setState={setProperty}
          />
          <Typography
            variant="h6"
            color="primary"
            sx={{ mt: 2 }}
          >
            สัมภาษณ์งาน
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={interview}
              onChange={(e) => {
                handleChange(e, setInterview)
              }}
            >
              <FormControlLabel value="Online Interview" control={<Radio />} label="Online Interview" />
              <FormControlLabel value="On-site interview" control={<Radio />} label="On-site interview" />
            </RadioGroup>
          </FormControl>
          {openError && _isEmpty(interview) && (
            <Typography sx={{ fontSize: '13.714285714285714px', margin: '0 14px 0', color: '#d32f2f' }}>
              please select รูปแบบการสัมภาษณ์งาน
            </Typography>
          )}
          {!_isEmpty(state)
          && (
          <>
            <Typography
              variant="h6"
              color="primary"
              sx={{ mt: 2 }}
            >
              การประกาศงาน
            </Typography>
            <Box sx={{ paddingLeft: 0.5 }}>
              <Switch announce={announce} setAnnounce={setAnnounce} />
            </Box>

          </>
          )}
          <Button
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit()}
            disabled={loading}
            fullWidth
            variant="contained"
          >
            {_isEmpty(state) ? 'เพิ่มตำแหน่งงาน' : 'แก้ไขตำแหน่งงาน'}
          </Button>
        </Box>
      </Box>
    </Box>

  )
}

export default AddPosition
AddPosition.propTypes = {
  id: PropTypes.string,
}
AddPosition.defaultProps = {
  id: '',
}
