import { createTheme } from '@mui/material';

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    inputs: palette.augmentColor({ color: {main: '#6750A4'} }),
    titulos: palette.augmentColor({ color: {main: '#3B1D70'} }),
  },
  typography:{
    fontFamily: ['Rowdies', 'cursive'].join(','),
    h3: {
        fontSize: 48,
        color: '#3B1D70',
    },
    h6: {
      fontSize: 26,
      color: 'white'
    }
  }
});

export default theme;