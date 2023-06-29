import './NavBar.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Temas.jsx'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
import { Link } from "react-router-dom";

export default function Navbar(){
    const imgStyle = {
        width: '180px',
        height: '105px',
        marginLeft: '20px'
      };
    return (
        <ThemeProvider theme={theme}>
            <nav className="navbar">
                <Grid container >
                    <Grid item xs={1.5} >
                        <Link to="/">
                            <img
                                src="src/assets/logo.png"
                                alt="logo de RentThemas"
                                style={imgStyle}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={8} mt={6.3} >
                        <Grid container spacing={3} className="navbar-list">
                            <Grid item>
                                <Link to="/alugueis">
                                    <Typography variant="h6">Aluguéis</Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/itens">
                                    <Typography variant="h6">Itens</Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/clientes">
                                    <Typography variant="h6">Clientes</Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/temas">
                                    <Typography variant="h6">Temas</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>    
                </Grid>
                
            </nav>
        </ThemeProvider>
      );
}