import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ButtonActionManagePosition from './ButtonActionManagePosition'

const columns = [
  { id: 'position', label: 'Position', minWidth: 120 },
  {
    id: 'positionNumber',
    label: 'อัตราที่รับ',
    align: 'right',
    minWidth: 70,
  },
  { id: 'created', label: 'Created', minWidth: 80 },
  { id: 'status', label: 'Status', minWidth: 80 },
  { id: 'action', label: 'Action' },
]

function createData(position, positionNumber, created, status) {
  return {
    position, positionNumber, created, status,
  }
}

const rows = [
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ไม่ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ไม่ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ไม่ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ไม่ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
  createData('Software Engineer', 2, '16-02-2021', 'ประกาศ'),
]

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.position}>
                  <TableCell align="">
                    {row.position}
                  </TableCell>
                  <TableCell align="right">
                    {row.positionNumber}
                  </TableCell>
                  <TableCell align="">
                    {row.created}
                  </TableCell>
                  <TableCell align="">
                    <Box sx={{
                      backgroundColor:
                      ((row.status === 'ประกาศ' && 'green')
                      || (row.status === 'ไม่ประกาศ' && 'orange')
                      ),
                      padding: '0.3rem',
                      borderRadius: '0.5rem',
                      display: 'inline-block',
                      color: '#fff',
                      fontWeight: 'bold',
                      boxShadow: '0 0 5px 2px #c8c7c6',
                    }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="">
                    <ButtonActionManagePosition />
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
  )
}
