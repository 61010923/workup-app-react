import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Typography, Box, Avatar } from '@mui/material'
import ButtonActionManageJobApp from './ButtonActionManageJobApp'

const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  {
    id: 'position',
    label: 'Position',
    minWidth: 110,
  },
  { id: 'skill', label: 'Skill', minWidth: 110 },
  { id: 'status', label: 'Status', minWidth: 90 },
  { id: 'action', label: 'Action' },
]

function createData(name, position, email, phone, skill, status, created) {
  return {
    name, position, email, phone, skill, status, created,
  }
}

const rows = [
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'ยังไม่ได้อ่าน', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
  createData('Vanakorn Inyai', 'Project Manager', 'testcompany@test.com', '0999999999', 'Fast learning', 'อ่านแล้ว', '16-02-2021'),
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  <TableCell align="">
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <Avatar
                        alt="N"
                        src="https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.6435-9/83554419_106210414280175_3006330223613444096_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFhlvqzGStqZBAFdkhlBkQ3N8O_W_p-RZg3w79b-n5FmOoQxkPUoZM01pikcdtbyH2jPS-FIgckXfpq2_Xkjocm&_nc_ohc=XxPFHROGU58AX8oG9CK&_nc_ht=scontent.fbkk7-2.fna&oh=00_AT9baaCF4Wfjr1ECOHmlQ5y1jU1WAhXIRYwytA-E67ugJQ&oe=6238D2BA"
                        sx={{ width: 50, height: 50, margin: 'auto 0' }}
                      />
                      <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subTitle" sx={{ fontWeight: 'bold', color: 'rgb(191 41 41)' }}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption">
                          {row.email}
                        </Typography>
                        <Typography variant="caption">
                          {row.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="">
                    {row.position}
                  </TableCell>
                  <TableCell align="">
                    {row.skill}
                  </TableCell>
                  <TableCell align="">
                    <Box sx={{
                      backgroundColor:
                      ((row.status === 'อ่านแล้ว' && 'green')
                      || (row.status === 'ยังไม่ได้อ่าน' && 'gray')
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
                    <ButtonActionManageJobApp />
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
