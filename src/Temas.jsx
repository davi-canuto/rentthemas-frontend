import { createTheme } from '@mui/material';

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    inputs: palette.augmentColor({ color: {main: '#6750A4'} }),
    titulos: palette.augmentColor({ color: {main: '#3B1D70'} }),
  },
  typography:{
    h3: {
        fontSize: 48,
        color: '#3B1D70',
        fontFamily: ['Rowdies', 'cursive'].join(','),
    }
  }
});

export default theme;