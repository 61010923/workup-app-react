import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import {
  Typography, Box, Avatar, Button,
} from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import axios from 'axios'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { format } from 'date-fns'
import ButtonActionManage from '../../component/ButtonActionManage'
import userDetail from '../../redux/selector/user.selector'

const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  {
    id: 'position',
    label: 'Position',
    minWidth: 110,
  },
  { id: 'updated', label: 'Updated', minWidth: 110 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action' },
]

function createData(name, position, email, phone, skill, status, created) {
  return {
    name, position, email, phone, skill, status, created,
  }
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const navigate = useNavigate()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const setAllData = (snapshot) => {
    const newArr = []
    snapshot.forEach((data, i) => {
      const newData = data
      newData.applicationId = data.applicationId
      newData.name = `${data.firstName} ${data.lastName}`
      newData.email = data.email
      newData.position = data.position
      newData.phone = data.phone
      newData.imgProfile = (
        <Avatar
          alt="N"
          src={data.imgProfile}
          sx={{ width: 50, height: 50, margin: 'auto 0' }}
        />
      )
      newData.status = data.status
      newData.updatedAt = data.updatedAt
      newData.url = `/application/${data.applicationId}`
      newArr.push(newData)
    })
    setRows(newArr)
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/application/company`, { headers: { authorization: userToken } })
      if (response.status === 200) {
        setAllData(_get(response, 'data.data'))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '76.5vh',
      }}
    >
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell
                      align=""
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(row.url, { state: { id: row.applicationId, position: row.position } })}

                    >
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        {row.imgProfile}
                        <Box
                          sx={{
                            ml: 2,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            variant="subTitle"
                            sx={{ fontWeight: 'bold', color: 'rgb(191 41 41)' }}
                          >
                            {row.name}
                          </Typography>
                          <Typography variant="caption">{row.email}</Typography>
                          <Typography variant="caption">{row.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      align=""
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(row.url, { state: { id: row.applicationId, position: row.position } })}
                    >
                      {row.position}
                    </TableCell>
                    <TableCell
                      align=""
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(row.url, { state: { id: row.applicationId, position: row.position } })}

                    >
                      {format(new Date(row.updatedAt), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell
                      align=""
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(row.url, { state: { id: row.applicationId, position: row.position } })}

                    >
                      <Box
                        sx={{
                          backgroundColor:
                            (row.status === 'callback' && 'green')
                            || (row.status === 'pending' && 'gray')
                            || (row.status === 'disapproved' && 'red'),
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          display: 'inline-block',
                          color: '#fff',
                          fontWeight: 'bold',
                          boxShadow: '0 0 5px 2px #c8c7c6',
                        }}
                      >
                        { (row.status === 'callback' && 'รอการติดต่อกลับ')
                            || (row.status === 'pending' && 'รอดำเดินการ')
                            || (row.status === 'disapproved' && 'ปฏิเสธ')}
                      </Box>
                    </TableCell>
                    <TableCell align="">
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
