import TextField from '@mui/material/TextField';
import './InputTexto.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Temas.jsx'

const TextInput = ({ label, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
        <TextField
            label={label}
            value={value}
            color="inputs"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            focused
            margin="normal"
        />
    </ThemeProvider>
  );
};

export default TextInput;