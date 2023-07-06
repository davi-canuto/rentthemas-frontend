import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../Temas.jsx";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container, TextField } from "@mui/material";
import Botao from "../../../Componentes/Botao/Botao.jsx";
import api from "../../../services/api.jsx";
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Index() {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();
  
  const filtrarDados = (event) => {
    setFiltro(event.target.value);
  };

  const mudarRota = () => {
     navigate("/itens/criar");
  };

  const editarItem = (id) => {
    const props = {
      id: id
    };
    navigate('/itens/editar', { state: props });
 };

  async function deletarItem (id){
    try {
      const response = await api.delete(`itens/${id}/`);
      const itens = await api.get("itens/");
      setItens(itens.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  const dadosFiltrados = itens.filter((item) => {
      if (item.name && item.name.toLowerCase().includes(filtro.toLowerCase())){
        return item
      }
    }
    
  );

  useEffect(() => {
    async function fetchItens() {
      try {
        const response = await api.get("itens/");
        setItens(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchItens();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ width: '900px' }}>
        <Typography mb={2} variant="h3">Itens</Typography>
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
          <Box mr={3}><Botao variant="contained" onClick={mudarRota} label="Novo Item" /></Box>
          
        </Grid>
        <Box display="flex" alignItems="center" justifyContent={'space-between'} m={1.3} p={1} sx={{ backgroundColor: "#f8eeee", borderRadius: 1, height: '38px' }}>
          <Typography ml={2} variant="subtitle1">Nome</Typography>
          <Box>
            <Typography mr={2} variant="subtitle1">Ações</Typography>
          </Box>
        </Box>
        <Box sx={{ 
            display: "flex",
            flexDirection: "column",
            height: 500,
            overflow: "hidden",
            overflowY: "scroll"
          }}>
          {dadosFiltrados.map((elemento) => (
            <Box display="flex" alignItems="center" justifyContent={'space-between'} boxShadow={3} key={elemento.id} m={1.3} p={1} sx={{ backgroundColor: "#f8eeee", borderRadius: 1, height: '38px' }}>
              <Typography ml={2} variant="subtitle1">{elemento.name}</Typography>
              <Box mt={0.6}>
                <EditIcon onClick={() => editarItem(elemento.id)} style={{ color: '#3B1D70', marginRight:'10px', cursor: 'pointer' }} />
                <DeleteIcon onClick={() => deletarItem(elemento.id)} style={{ color: 'red', cursor: 'pointer' }} />
              </Box>
            </Box>
          ))}
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
