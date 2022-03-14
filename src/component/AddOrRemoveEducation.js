import React, { useState } from 'react'
import {
  Box, MenuItem, Button, IconButton,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import _map from 'lodash/map'
import PropTypes, { any } from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
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
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...state]
    list[index][name] = value
    // list[0].?[]
    setState(list)
  }

  // handle click event of the Remove Button
  const handleRemoveClick = (index) => {
    const list = [...state]
    list.splice(index, 1)
    setState(list)
  }

  // handle click event of the Add Button
  const handleAddClick = () => {
    setState([...state, { education: '', major: '', university: '' }])
  }

  return (
    <>
      {_map(state, (object, i) => (
        <>
          <Box display="flex" alignItem="center" width="100%">
            {state.length !== i && (
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveClick(i)}
                color="error"
              >
                <RemoveCircleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
              </IconButton>
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
                  onChange={(e) => handleInputChange(e, i)}
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
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                  />
                </Box>
                <Box sx={{ ml: 2, width: '100%' }}>
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
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                  />
                </Box>
              </Box>
              <Box width="100%" mt={2} display="flex" gap={2}>
                <Box width="100%">
                  <TextField fullWidth />
                </Box>
                <Box width="100%">
                  <TextField fullWidth />
                </Box>
                <Box width="100%" />
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
