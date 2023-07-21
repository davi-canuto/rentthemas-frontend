import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../Temas.jsx";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container, TextField } from "@mui/material";
import Botao from "../../../Componentes/Botao/Botao.jsx";
import api from "../../../services/api.jsx";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Index() {
  const [clients, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  const filtrarDados = (event) => {
    setFiltro(event.target.value);
  };

  const mudarRota = () => {
    navigate("/clientes/criar");
  };

  const editarCliente = (id) => {
    const props = {
      id: id,
    };
    navigate("/clientes/editar", { state: props });
  };

  async function deletarCliente(id) {
    try {
      const response = await api.delete(`clients/${id}/`);
      const clients = await api.get("clients/");
      setClientes(clients.data);
    } catch (error) {
      console.error(error);
    }
  }

  const dadosFiltrados = clients.filter((cliente) => {
    if (
      cliente.name &&
      cliente.name.toLowerCase().includes(filtro.toLowerCase())
    ) {
      return cliente;
    }
  });

  useEffect(() => {
    async function fetchItens() {
      try {
        const response = await api.get("clients/");
        setClientes(response.data);
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
          Clientes
        </Typography>
        <Grid container justifyContent={"space-between"} ml={1.8} p={1}>
          <TextField
            label="Buscar"
            value={filtro}
            onChange={filtrarDados}
            variant="outlined"
            sx={{
              width: "50%",
            }}
          />
          <Box mr={3}>
            <Botao variant="contained" onClick={mudarRota} label="Novo Cliente" />
          </Box>
        </Grid>
        <Grid container alignItems="center"  m={1.3} p={1} sx={{ backgroundColor: "#f8eeee", borderRadius: 1 }}>
          <Grid item xs={3.3}>
            <Typography ml={2} variant="subtitle1">Nome</Typography>
          </Grid>
          <Grid item xs={6.5}>
            <Typography  variant="subtitle1">Email</Typography>
          </Grid>  
          <Grid item xs={1}>
            <Typography  variant="subtitle1">Ações</Typography>
          </Grid> 
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 500,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {dadosFiltrados.map((elemento) => (
            <Grid container alignItems="center"  boxShadow={3} key={elemento.id} m={1.3} p={1} sx={{ backgroundColor: "#f8eeee", borderRadius: 1 }}>
              <Grid item xs={3.3}>
                <Typography ml={2} variant="subtitle1">{elemento.name}</Typography>
              </Grid>
              <Grid item xs={6.5}>
              <Typography variant="subtitle1">{elemento.email}</Typography>
              </Grid>
              <Grid item xs={2} ml={1}>
                <Box mt={0.6}>
                  <EditIcon onClick={() => editarCliente(elemento.id)} style={{ color: '#3B1D70', marginRight:'10px', cursor: 'pointer' }} />
                  <DeleteIcon onClick={() => deletarCliente(elemento.id)} style={{ color: 'red', cursor: 'pointer' }} />
                </Box>
              </Grid>      
            </Grid>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
