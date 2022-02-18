import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

const columns = [
  { id: 'position', label: 'Position', minWidth: 150 },
  {
    id: 'positionNumber',
    label: 'อัตราที่รับ',
    minWidth: 150,
    align: 'right',
  },
  { id: 'created', label: 'Created', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },
]

function createData(position, positionNumber, created, status, action) {
  return {
    position, positionNumber, created, status, action,
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
                  <TableCell align="">
                    {row.position}
                  </TableCell>
                  <TableCell align="">
                    {row.position}
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
