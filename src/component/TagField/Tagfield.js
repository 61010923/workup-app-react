import React from 'react'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import PropTypes from 'prop-types'
import _uniq from 'lodash/uniq'
import TextField from '../Textfield'

function Tagfield(props) {
  const {
    label, state, setState, error, loading,
  } = props
  const handleChange = (e, i) => {
    setState(_uniq(i))
  }
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[].map((option) => option)}
      value={state.map((option) => option)}
      onChange={(e, i) => handleChange(e, i)}
      freeSolo
      renderTags={(value, getTagProps) => value.map((option, index) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      ))}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          helperText={error ? ('Please Enter Your Skill') : ('Type and enter your skill')}
          error={error}
          fullWidth
          loading={loading}
        />

      )}
    />
  )
}

export default Tagfield

Tagfield.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.arrayOf(PropTypes.any),
  setState: PropTypes.func,
  error: PropTypes.bool,
  loading: PropTypes.bool,
}

Tagfield.defaultProps = {
  state: '',
  setState: () => {},
  error: false,
  loading: false,
}
