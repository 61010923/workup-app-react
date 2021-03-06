import React, { useState, useEffect } from 'react'
import {
  Box, MenuItem, Button, IconButton,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import _map from 'lodash/map'
import PropTypes, { any } from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { makeStyles } from '@mui/styles'
import TextField from './Textfield'

const useStyles = makeStyles((theme) => ({

}))
function App({
  loading, label, keyText, state, setState, error,
}) {
  const classes = useStyles()
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...state]
    list[index] = value
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
    setState([...state, ''])
    // setError([...error, false])
  }
  // const setDefaultError = () => {
  //   _map(state, (item, i) => {
  //     const data = [...error]
  //     data.push(false)
  //     setError(data)
  //   })
  // }
  // const handleChangeError = (i) => {
  //   const data = [...error]
  //   data[i] = true
  //   setError(data)
  // }
  // useEffect(() => {
  //   setDefaultError()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <>
      {_map(state, (value, i) => (
        <>
          <Box
            key={keyText + i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
            }}
          >
            {/* {state.length !== i + 1 && ( */}
            {state.length !== 1 && (
            <Box>
              <IconButton aria-label="delete" size="small" onClick={() => handleRemoveClick(i)} color="error">
                <RemoveCircleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Box>
            )}
            <TextField
              loading={loading}
              sx={{ ml: 0.2 }}
              required
              label={label}
              autoComplete="off"
              value={value}
              error={error && _isEmpty(value[i])}
              helperText={
              error && _isEmpty(value[i]) && `please fill ${label}`
                  }
              onChange={(e) => {
                handleInputChange(e, i)
                // handleChangeError(i)
              }}
              fullWidth
            />

          </Box>
          {state.length - 1 === i
            && (
              <Button
                sx={{ mt: 1, ml: '1px', textTransform: 'none' }}
                startIcon={<AddCircleOutlineOutlinedIcon />}
                onClick={handleAddClick}
                variant="text"
                color="success"
              >
                ???????????????
                {' '}
                {label}
              </Button>
            )}
        </>
      ))}
    </>
  )
}

export default App
App.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  keyText: PropTypes.string,
  state: PropTypes.arrayOf(PropTypes.any),
  setState: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.any),

}
App.defaultProps = {
  loading: null,
  label: '',
  keyText: '',
  state: [],
  setState: () => {},
  error: [],
}
