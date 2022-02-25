import React, { useState } from 'react'
import {
  Box, MenuItem, Button, TextField, IconButton,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import _map from 'lodash/map'
import PropTypes, { any } from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

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
function App({ loading, state, setState }) {
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
        <Box
          key={`state${i}`}
          sx={{ display: 'flex', mt: 2 }}
        >
          {state.length - 1 === i
           && (
           <IconButton aria-label="add" onClick={handleAddClick} color="success">
             <AddCircleOutlineOutlinedIcon />
           </IconButton>
           )}
          {state.length !== i + 1 && (
          <IconButton aria-label="delete" onClick={() => handleRemoveClick(i)} color="error">
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          )}
          <TextField
            sx={{ ml: 0.2 }}
            name="education"
            id="outlined-select-currency"
            select
            label="Education"
            value={object.education}
            error={loading && _isEmpty(object.education)}
            helperText={
                    loading && _isEmpty(object.education) && 'please select education'
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
          <TextField
            sx={{ ml: 2 }}
            name="major"
            required
            id="demo-helper-text-aligned"
            label="Major/Program"
            autoComplete="off"
            value={object.major}
            error={loading && _isEmpty(object.major)}
            helperText={
                    loading && _isEmpty(object.major) && 'please fill major/program'
                  }
            onChange={(e) => handleInputChange(e, i)}
            fullWidth
          />
          <TextField
            sx={{ ml: 2 }}
            name="university"
            required
            id="demo-helper-text-aligned"
            label="University/School"
            autoComplete="off"
            value={object.university}
            error={loading && _isEmpty(object.university)}
            helperText={
                    loading && _isEmpty(object.university) && 'please fill university/school'
                  }
            onChange={(e) => handleInputChange(e, i)}
            fullWidth
          />

        </Box>
      ))}

    </>
  )
}

export default App
App.propTypes = {
  loading: PropTypes.bool,
  state: PropTypes.arrayOf(PropTypes.any),
  setState: PropTypes.func,
}
App.defaultProps = {
  loading: null,
  state: [],
  setState: () => {},
}
