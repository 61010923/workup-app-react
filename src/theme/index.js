import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles'
import typography from './typography'
import palette from './palette'
import shadows from './shadow'

const theme = createMuiTheme({
  shape: {
    borderRadius: 8,
  },
  palette,
  typography,
  shadows,
})

export default theme
