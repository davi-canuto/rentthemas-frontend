import Typography from '@mui/material/Typography';
import theme from '../../Temas.jsx'
import { ThemeProvider } from '@mui/material/styles';

const temas = () => {
  return (
    <ThemeProvider theme={theme}>
        <Typography variant="h3">Falta implementar - Temas</Typography>
    </ThemeProvider>
  )
}

export default temas;