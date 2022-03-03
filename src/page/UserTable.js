import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, Button } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const columns = [
  { id: 'company', label: 'Company', minWidth: 120 },
  { id: 'position', label: 'Position', minWidth: 120 },
  { id: 'sent', label: 'Sent', minWidth: 80 },
  { id: 'status', label: 'Status', minWidth: 140 },
  { id: 'action', label: 'Action' },
]

function createData(company, position, sent, status) {
  return {
    company, position, sent, status,
  }
}

const rows = [
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอการติดต่อกลับ'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
  createData('SpaceX', 'Software Engineer', '16-02-2021', 'รอนัดสัมภาษณ์งาน'),
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
                      {row.company}
                    </TableCell>
                    <TableCell align="">
                      {row.position}
                    </TableCell>
                    <TableCell align="">
                      {row.sent}
                    </TableCell>
                    <TableCell align="">
                      <Box sx={{
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
                      </Box>
                    </TableCell>
                    <TableCell align="">
                      <Button color="error" variant="contained" startIcon={<CancelOutlinedIcon />}>
                        cancel
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
