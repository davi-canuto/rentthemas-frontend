import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Temas.jsx";
import Typography from "@mui/material/Typography";
import Botao from "../../Componentes/Botao/Botao.jsx";
import { Box, Grid, Container, TextField } from "@mui/material";
import api from "../../services/api.jsx";
import "./index.css";

export default function Index() {
  const [clientQuantity, setClientQuantity] = useState([]);
  const [rentQuantity, setRentQuantity] = useState([]);
  const [themeQuantity, setThemeQuantity] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  const filtrarDados = (event) => {
    setFiltro(event.target.value);
  };

  const mudarRota = () => {
    navigate("/clientes/criar");
  };

  const dadosFiltrados = []

  useEffect(() => {
    async function fetchItens() {
      try {
        const clientResponse = await api.get("clients/");
        setClientQuantity(clientResponse.data.length);

        const rentResponse = await api.get("alugueis/");
        setRentQuantity(rentResponse.data.length);

        const themeResponse = await api.get("temas/");

        setThemeQuantity(themeResponse.data.length);

      } catch (error) {
        console.error(error);
      }
    }

    fetchItens();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ width: "900px" }}>
        <Typography mb={2} variant="h3">
          Dashboard
        </Typography>
        <Card sx={{ minWidth: 10 }}>
            {/* <CardContent>
               <Grid item xs={2} ml={1}>
                  <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </CardContent> */}
        </Card>
      </Container>
    </ThemeProvider>
  );
}
