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
    if (type === 'start' || type === 'end') {
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
      education: '', major: '', university: '', start: null, end: null,
    }])
  }
  return (
    <>
      {_map(state, (object, i) => (
        <>
          <Box display="flex" alignItems="center" width="100%">
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
              <Box key={`state${i}`} sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  loading={loading}
                  sx={{ ml: 0.2 }}
                  name="education"
                  id="outlined-select-currency"
                  select
                  label="Education"
                  value={object.education}
                  error={error && _isEmpty(object.education)}
                  helperText={
                    error
                    && _isEmpty(object.education)
                    && 'please select education'
                  }
                  onChange={(e) => handleInputChange(e, i, 'education')}
                  fullWidth
                >
                  {_map(educationSelect, (option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ ml: 2, width: '100%' }}>
                  <TextField
                    loading={loading}
                    name="major"
                    required
                    id="demo-helper-text-aligned"
                    label="Major/Program"
                    autoComplete="off"
                    value={object.major}
                    error={error && _isEmpty(object.major)}
                    helperText={
                      error
                      && _isEmpty(object.major)
                      && 'please fill major/program'
                    }
                    onChange={(e) => handleInputChange(e, i, 'major')}
                    fullWidth
                  />
                </Box>
              </Box>
              <Box mt={2} display="flex" gap={2}>
                <Box sx={{ width: '100%' }}>
                  <TextField
                    loading={loading}
                    name="university"
                    required
                    id="demo-helper-text-aligned"
                    label="University/School"
                    autoComplete="off"
                    value={object.university}
                    error={error && _isEmpty(object.university)}
                    helperText={
                      error
                      && _isEmpty(object.university)
                      && 'please fill University/School'
                    }
                    onChange={(e) => handleInputChange(e, i, 'university')}
                    fullWidth
                  />
                </Box>

                <Box sx={{ width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {loading ? (
                      <Skeleton variant="text" width={150} />
                    ) : (
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <DatePicker
                          views={['year']}
                          label="Start"
                          name="start"
                          value={object.start}
                          onChange={(e) => handleInputChange(e, i, 'start')}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={
                                error
                                && _isEmpty(new Date(object.start).toISOString())
                              }
                              helperText={
                                error
                                && _isEmpty(
                                  new Date(object.start).toISOString(),
                                )
                                && 'please fill start'
                              }
                            />
                          )}
                        />
                        <DatePicker
                          views={['year']}
                          label="End"
                          name="end"
                          value={object.end}
                          onChange={(e) => handleInputChange(e, i, 'end')}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={
                                error
                                && _isEmpty(new Date(object.end).toISOString())
                                && 'please fill end'
                              }
                              error={
                                error
                                && _isEmpty(new Date(object.end).toISOString())
                              }
                            />
                          )}
                        />
                      </Box>
                    )}
                  </LocalizationProvider>
                </Box>
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
              เพิ่ม University/School
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
