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
  Box, Button, Tooltip, IconButton, Skeleton, Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import _startCase from 'lodash/startCase'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import ButtonActionManage from './ButtonActionManage'
import ButtonAddPosition from './ButtonAddPosition'
import 'sweetalert2/dist/sweetalert2.css'
import userDetail from '../redux/selector/user.selector'

export default function StickyHeadTable({ columns, body, loading }) {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [disableButton, setDisableButton] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(userDetail)
  const userToken = _get(user, 'userDetail.userToken')
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleDelete = async (id) => {
    const swalRes = await Swal.fire({
      title: 'Are you sure ?',
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
          `${process.env.REACT_APP_BASE_URL}/api/v1/announcement/company/${id}`,
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
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 1 }}>
      <ButtonAddPosition />
      <TableContainer sx={{ maxHeight: 440 }}>
        {
          loading ? (
            <>
              <Skeleton height={40} sx={{ minWidth: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ minWidth: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ minWidth: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ minWidth: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ minWidth: '100%', mt: 2 }} />
              <Skeleton height={40} sx={{ minWidth: '100%', mt: 2 }} />

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
                  .map((item, i) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item.id}
                    >
                      <TableCell align="">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                          <Box>{_startCase(item.position)}</Box>
                          <Tooltip title={`See ${item.position} details`}>

                            <IconButton aria-label="delete" onClick={() => navigate(`/companyCareer/${_get(item, '_id')}`)}>
                              <InfoOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {item.positionTotal}
                      </TableCell>
                      <TableCell align="">
                        {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell align="right">
                        {item.salary}
                      </TableCell>
                      <TableCell align="">
                        <Box sx={{
                          backgroundColor:
                  ((item.isActive === true && 'green')
                  || (item.isActive === false && 'orange')
                  ),
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          display: 'inline-block',
                          color: '#fff',
                          fontWeight: 'bold',
                          boxShadow: '0 0 5px 2px #c8c7c6',
                        }}
                        >
                          {(item.isActive === true && 'ประกาศ')
                  || (item.isActive === false && 'ไม่ประกาศ')}
                        </Box>
                      </TableCell>
                      <TableCell align="">
                        <ButtonActionManage key={item.id} buttonText="Edit" icon={<EditIcon />} path="/ManagePosition" data={item} deleteFunc={handleDelete} disable={disableButton} />
                      </TableCell>
                    </TableRow>
                  ))}
                {_isEmpty(body) && (
                <TableCell align="center" colSpan={6}>
                  <Typography>
                    No position, please add position
                  </Typography>
                </TableCell>
                )}
              </TableBody>
            </Table>
          )
}
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

  )
}
StickyHeadTable.propTypes = {
  columns: PropTypes.arrayOf(),
  body: PropTypes.arrayOf(),
  loading: PropTypes.bool,
}
StickyHeadTable.defaultProps = {
  columns: [],
  body: [],
  loading: false,
}
