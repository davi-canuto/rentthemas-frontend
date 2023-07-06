import TextField from '@mui/material/TextField';
import './InputTexto.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Temas.jsx'
import InputAdornment from '@mui/material/InputAdornment';

const TextInput = ({ label, value, onChange, adornment = '', type = 'text' }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
        <TextField
            label={label}
            value={value}
            type={type}
            color="inputs"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            focused
            margin="normal"
            InputProps={adornment != '' ? {
              startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
            } : null}
        />
    </ThemeProvider>
  );
};

export default TextInput;