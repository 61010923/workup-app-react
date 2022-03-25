import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import CompanyTablePosition from '../../component/CompanyTablePosition'
import userDetail from '../../redux/selector/user.selector'

const columns = [
  { id: 'position', label: 'Position', minWidth: 120 },
  {
    id: 'positionNumber',
    label: 'อัตราที่รับ',
    align: 'right',
    minWidth: 70,
  },
  { id: 'created', label: 'Created', minWidth: 80 },
  {
    id: 'salary', label: 'Salary', align: 'right', minWidth: 80,
  },
  { id: 'status', label: 'Status', minWidth: 90 },
  { id: 'action', label: 'Action' },
]

export default function StickyHeadTable() {
  const [body, setBody] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const checkData = () => {
    if (_isEmpty(body)) {
      setLoading(false)
    }
  }
  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/announcement/companyAnnounce`,
        {
          headers: {
            authorization: userToken,
          },
        },
      )
      if (response.status === 200 || response.status === 201) {
        setBody(_get(response, 'data.data'))
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    checkData()
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box sx={{
      minHeight: '76.5vh',
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <CompanyTablePosition columns={columns} body={body} loading={loading} />
    </Box>
  )
}
