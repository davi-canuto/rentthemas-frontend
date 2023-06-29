import Typography from '@mui/material/Typography';
import theme from '../../../Temas.jsx'
import { ThemeProvider } from '@mui/material/styles';

const index = () => {
  return (
    <ThemeProvider theme={theme}>
        <Typography variant="h3">Falta implementar - Clientes</Typography>
    </ThemeProvider>
  )
}

export default index;