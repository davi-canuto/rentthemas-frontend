import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Temas.jsx";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import CardDashboard from "../../Componentes/CardDashboard/index.jsx";
import CardQuantidade from "../../Componentes/CardQuantidade/index.jsx";
import api from "../../services/api.jsx";
import "./index.css";

export default function Index() {
  const [clientQuantity, setClientQuantity] = useState([]);
  const [rentQuantity, setRentQuantity] = useState([]);
  const [themeQuantity, setThemeQuantity] = useState([]);
  const [itensQuantity, setItensQuantity] = useState([]);
  const navigate = useNavigate();
  const [topicos, setTopicos] = useState([
    {
      nome: "Temas",
      icon: "temas",
    },
    {
      nome: "Clientes",
      icon: "clientes",
    },
    {
      nome: "Items",
      icon: "items",
    },
    {
      nome: "Aluguéis",
      icon: "algueis",
    },
  ]);

  const mudarRota = () => {
    navigate("/clientes/criar");
  };

  const dadosFiltrados = [];

  const tamanhoClientes = () => {
    return clientQuantity.length
  };

  const tamanhoTemas= () => {
    return themeQuantity.length
  };

  const tamanhoAlugueis = () => {
    return rentQuantity.length
  };

  const tamanhoItens = () => {
    return itensQuantity.length
  };

  const tipo = (icon) => {
    if (icon == "temas") {
      return tamanhoTemas()
    }
    if (icon == "clientes") {
      return tamanhoClientes()
    }
    if (icon == "items") {
      return tamanhoItens()
    }
    if (icon == "algueis") {
      return tamanhoAlugueis()
    }
  };

  useEffect(() => {
    async function fetchItens() {
      try {
        const clientResponse = await api.get("clients/");
        setClientQuantity(clientResponse.data);

        const rentResponse = await api.get("rents/");
        setRentQuantity(rentResponse.data);

        const themeResponse = await api.get("themes/");
        setThemeQuantity(themeResponse.data);
        console.log(themeQuantity)

        const itensResponse = await api.get("itens/");
        setItensQuantity(itensResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchItens();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ width: "100%" }}>
        <Typography mb={2} mt={15} variant="h3">
          Temas Populares
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="around"
          p={2}
          sx={{ borderRadius: 1 }}
        >
          {themeQuantity.map((tema, index) => {
            if (index < 3 ){
              return (<CardDashboard key={tema.id} tema={tema}></CardDashboard>)
            }
            return
          })}
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="around"
          p={2}
          sx={{ borderRadius: 1 }}
        >
          {topicos.map((topico) => (
            <CardQuantidade
              quantidade={tipo(topico.icon)}
              label={topico.nome}
              icon={topico.icon}
            ></CardQuantidade>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
