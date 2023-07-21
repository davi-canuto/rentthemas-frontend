import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../Temas.jsx";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container, TextField } from "@mui/material";
import Botao from "../../../Componentes/Botao/Botao.jsx";
import api from "../../../services/api.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Index() {
  const [alugueis, setAlugueis] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  const filtrarDados = (event) => {
    setFiltro(event.target.value);
  };

  const mudarRota = () => {
    navigate("/alugueis/criar");
  };

  const editarAluguel = (id) => {
    const props = {
      id: id,
    };
    navigate("/alugueis/editar", { state: props });
  };

  const formatDate = (data) => {
    let split = data.split('-')
    return split[2] + '/' + split[1] + '/' + split[0]
  }

  async function deletarAluguel(id) {
    try {
      const response = await api.delete(`rents/${id}/`);
      const alugueis = await api.get("rents/");
      setAlugueis(alugueis.data);
    } catch (error) {
      console.error(error);
    }
  }

  const dadosFiltrados = alugueis.filter((aluguel) => {
    if (
      aluguel.date &&
      aluguel.date.toLowerCase().includes(filtro.toLowerCase())
    ) {
      return aluguel;
    }
  });

  useEffect(() => {
    async function fetchAlugueis() {
      try {
        const response = await api.get("rents/");
        console.log(response.data)
        setAlugueis(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAlugueis();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ width: '900px' }}>
        <Typography mb={2} variant="h3">Aluguéis</Typography>
        <Grid container justifyContent={'space-between'} ml={1.8} p={1}>
          <TextField
            label="Buscar"
            value={filtro}
            onChange={filtrarDados}
            variant="outlined"
            sx={{
              width: '50%'
            }}
          />
          <Box mr={3}><Botao variant="contained" onClick={mudarRota} label="Novo Aluguel" /></Box>

        </Grid>
        <Grid container alignItems="center"  m={1.3} p={1} sx={{ backgroundColor: "#f8eeee", borderRadius: 1 }}>
          <Grid item xs={3}>
            <Typography ml={2} variant="subtitle1">Data</Typography>
          </Grid>
          <Grid item xs={2.6}>
            <Typography  variant="subtitle1">Hora Início</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography  variant="subtitle1">Hora Fim</Typography>
          </Grid> 
          <Grid item xs={1}>
            <Typography  variant="subtitle1">Ações</Typography>
          </Grid> 
        </Grid>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: 500,
            overflow: "hidden",
            overflowY: "scroll"
          }}>
          {dadosFiltrados.map((elemento) => (
            <Grid container alignItems="center"  boxShadow={3} key={elemento.id} m={1.3} p={1} sx={{ backgroundColor: "#f8eeee", borderRadius: 1 }}>
              <Grid item xs={3.1}>
                <Typography ml={2} variant="subtitle1">{formatDate(elemento.date)}</Typography>
              </Grid>
              <Grid item xs={2.6}>
              <Typography variant="subtitle1">{elemento.start_hours}</Typography>
              </Grid>
              <Grid item xs={4}>
              <Typography variant="subtitle1">{elemento.end_hours}</Typography>
              </Grid>
              <Grid item xs={2} ml={1}>
                <Box mt={0.6}>
                  <EditIcon onClick={() => editarAluguel(elemento.id)} style={{ color: '#3B1D70', marginRight:'10px', cursor: 'pointer' }} />
                  <DeleteIcon onClick={() => deletarAluguel(elemento.id)} style={{ color: 'red', cursor: 'pointer' }} />
                </Box>
              </Grid>      
            </Grid>
          ))}
        </Box>

      </Container>
    </ThemeProvider>
  );
}
