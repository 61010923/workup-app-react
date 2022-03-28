import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import {
  Avatar, Box, Button, Tooltip, IconButton, Skeleton,
} from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _startCase from 'lodash/startCase'
import {
  format,
} from 'date-fns'
import { useNavigate } from 'react-router-dom'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Swal from 'sweetalert2'
import userDetail from '../../redux/selector/user.selector'
import 'sweetalert2/dist/sweetalert2.css'

const columns = [
  { id: 'company', label: 'Company', minWidth: 120 },
  { id: 'position', label: 'Position', minWidth: 120 },
  { id: 'sent', label: 'Sent', minWidth: 80 },
  { id: 'status', label: 'Status', minWidth: 140 },
  { id: 'action', label: 'Action' },
]

export default function StickyHeadTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [disableButton, setDisableButton] = useState(false)
  const [body, setBody] = useState([])
  const user = useSelector(userDetail)
  const navigate = useNavigate()
  const userToken = _get(user, 'userDetail.userToken')
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const checkData = () => {
    if (_isEmpty(body)) {
      setLoading(false)
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/application/candidate`,
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
  const handleDelete = async (id) => {
    const swalRes = await Swal.fire({
      title: 'Are you sure kkk?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    })
    if (swalRes.isConfirmed) {
      setDisableButton(true)
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/v1/application/candidate/${id}`,
          {
            headers: {
              authorization: userToken,
            },
          },
        )
        if (response.status === 200 || response.status === 201) {
          // setBody(_get(response, 'data.data'))
          setDisableButton(false)
          Swal.fire(
            'cancelled!',
            'Your job application has been cancelled.',
            'success',
          )
        }
      } catch (error) {
        console.log(error)
        Swal.fire(
          'Something went wrong!',
          'Please try again.',
          'error',
        )
        setDisableButton(false)
      }
    }
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '76.5vh',
    }}
    >
      <Paper sx={{
        width: '100%',
        overflow: 'hidden',
      }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          {loading ? (
            <>
              <Skeleton height={40} sx={{ width: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ width: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ width: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ width: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ width: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ width: '100%', mt: 2 }} />
            </>
          ) : (
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
                {body
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.position}
                    >
                      <TableCell align="">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar
                            src={row.companyImg}
                            alt="company"
                            sx={{
                              objectFit: 'cover',
                            }}
                          />
                          <Box>
                            {_startCase(row.companyName)}
                          </Box>
                          <Tooltip title={`See ${row.companyName} details`}>

                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                navigate(`/companyCareer/${row.announceId}`)
                              }}
                            >
                              <InfoOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell align="">
                        {_startCase(row.position)}
                      </TableCell>
                      <TableCell align="">
                        {format(new Date(_get(row, 'updatedAt', new Date())), 'MM/dd/yyyy HH:mm')}
                      </TableCell>
                      <TableCell align="">
                        {/* <Box sx={{
                        backgroundColor:
                      ((row.status === 'รอนัดสัมภาษณ์งาน' && 'primary.main')
                      || (row.status === 'รอการติดต่อกลับ' && 'gray')
                      ),
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        display: 'inline-block',
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: '0 0 5px 2px #c8c7c6',
                      }}
                      >
                        {row.status}
                      </Box> */}
                      </TableCell>
                      <TableCell align="">
                        <Button color="error" variant="contained" disabled={disableButton} startIcon={<CancelOutlinedIcon />} onClick={() => handleDelete(row.applicationId)}>
                          cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {_isEmpty(body)
                && (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="center" colSpan={5}>
                      No job application submission information.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={body.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>

  )
}
