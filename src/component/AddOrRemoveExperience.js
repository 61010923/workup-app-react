import React, { useState } from 'react'
import {
  Box, MenuItem, Button, IconButton, Skeleton,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import _map from 'lodash/map'
import PropTypes, { any } from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TextField from './Textfield'

const educationSelect = [
  {
    value: 'Junior High School ',
    label: 'ระดับชั้นมัธยมศึกษาตอนต้น',
  },
  {
    value: 'Senior High School',
    label: 'ระดับชั้นมัธยมศึกษาตอนปลาย',
  },
  {
    value: 'Vocational Certificate',
    label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)',
  },
  {
    value: '​Certificate of Technical Vocation',
    label: 'ประกาศนียบัตรวิชาชีพเทคนิค (ปวท.)',
  },
  {
    value: '​High Vocational Certificate',
    label: 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)',
  },
  {
    value: '​Bachelor Degrees',
    label: 'ระดับปริญญาตรี',
  },
  {
    value: '​Master Degrees',
    label: 'ระดับปริญญาโท',
  },
  {
    value: '​Doctor Degrees',
    label: 'ระดับปริญญาเอก',
  },
]
function App({
  loading, error, state, setState,
}) {
  // handle input change
  const handleInputChange = (e, index, type) => {
    if (type !== '') {
      const list = [...state]
      list[index][type] = e
      setState(list)
    } else {
      const { name, value } = e.target
      const list = [...state]
      list[index][type] = value
      setState(list)
    }
  }
  // handle click event of the Remove Button
  const handleRemoveClick = (index) => {
    const list = [...state]
    list.splice(index, 1)
    setState(list)
  }

  // handle click event of the Add Button
  const handleAddClick = () => {
    setState([...state, {
      position: '', company: '', start: null, end: null,
    }])
  }

  return (
    <>
      {_map(state, (object, i) => (
        <>
          <Box key={`state${i}`} display="flex" alignItems="center" width="100%">

            {state.length !== 1 && (
              <Box sx={{ mt: 2 }}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveClick(i)}
                  color="error"
                >
                  <RemoveCircleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
                </IconButton>
              </Box>
            )}
            <Box width="100%">
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  loading={loading}
                  name="position"
                  required
                  id="demo-helper-text-aligned"
                  label="Position"
                  autoComplete="off"
                  value={object.position}
                  error={error && _isEmpty(object.position)}
                  helperText={
                      error
                      && _isEmpty(object.position)
                      && 'please fill position'
                    }
                  onChange={(e) => handleInputChange(e, i)}
                  fullWidth
                />
                <Box sx={{ ml: 2, width: '100%' }}>
                  <TextField
                    loading={loading}
                    name="company"
                    required
                    id="demo-helper-text-aligned"
                    label="Company"
                    autoComplete="off"
                    value={object.company}
                    error={error && _isEmpty(object.company)}
                    helperText={
                      error
                      && _isEmpty(object.company)
                      && 'please fill company'
                    }
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                  />
                </Box>
              </Box>
              <Box mt={2} display="flex" gap={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {loading ? (<Skeleton variant="text" width="100%" height={56} />)
                    : (
                      <>
                        <Box sx={{ width: '100%' }}>
                          <DatePicker
                            views={['year']}
                            label="Start"
                            name="start"
                            value={object.start}
                            onChange={(e) => handleInputChange(e, i, 'start')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                error={error && _isEmpty(object.start)}
                                helperText={
                      error
                      && _isEmpty(object.start)
                      && 'please fill start'
                    }
                              />
                            )}
                          />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <DatePicker
                            views={['year']}
                            label="End"
                            name="end"
                            value={object.end}
                            onChange={(e) => handleInputChange(e, i, 'end')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                helperText={
                      error
                      && _isEmpty(object.end)
                      && 'please fill end'
                    }
                                error={error && _isEmpty(object.end)}
                              />
                            )}
                          />
                        </Box>
                      </>
                    )}

                </LocalizationProvider>
              </Box>
            </Box>
          </Box>

          {state.length - 1 === i && (
            <Button
              sx={{ mt: 1, ml: '3px', textTransform: 'none' }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={handleAddClick}
              variant="text"
              color="success"
            >
              เพิ่ม ประสบการณ์ทำงาน
            </Button>
          )}
        </>
      ))}
    </>
  )
}

export default App
App.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool,
  state: PropTypes.arrayOf(PropTypes.any),
  setState: PropTypes.func,
}
App.defaultProps = {
  error: null,
  loading: null,
  state: [],
  setState: () => {},
}
