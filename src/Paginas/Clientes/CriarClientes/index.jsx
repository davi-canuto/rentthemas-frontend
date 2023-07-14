import InputTexto from "../../../Componentes/Inputs/InputTexto.jsx";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../Temas.jsx";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Botao from "../../../Componentes/Botao/Botao.jsx";
import api from "../../../services/api.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function MyApp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state ? location.state : null;

  const routeChangeBack = () => {
    let path = `/clientes`;
    navigate(path);
  };

  const handleNome = (event) => {
    setNome(event);
  };

  const handleEmail = (event) => {
    setEmail(event);
  };

  const handleTelefone1 = (event) => {
    setTelefone1(event);
  };

  const handleTelefone2 = (event) => {
    setTelefone2(event);
  };

  async function submit() {
    if (nome == "" || email == "") {
      console.log("não pode");
      return;
    }
    try {
      const data = {
        name: nome,
        email: email,
      };
      const response = props
        ? api.put(`clients/${props.id}/`, data)
        : await api.post("clients/", data);
      routeChangeBack();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchClientes() {
      if (props) {
        try {
          const response = await api.get(`clients/${props.id}/`);
          setNome(response.data.name);
          setEmail(response.data.email);
          setTelefone1(response.data.telefone1);
          setTelefone2(response.data.telefone2);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchClientes();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">
        {props ? "Edição" : "Cadastro"} de Cliente
      </Typography>
      <div>
        <InputTexto label="Nome" value={nome} onChange={handleNome} />
        <InputTexto label="Email" value={email} onChange={handleEmail} />
        {/* <InputTexto
          label="Telefone 1"
          value={telefone1}
          onChange={handleTelefone1}
        />
        <InputTexto
          label="Telefone 2"
          value={telefone2}
          onChange={handleTelefone2}
        /> */}
        <Box display="flex" justifyContent="space-between">
          <Botao variant="outlined" onClick={routeChangeBack} label="Voltar" />
          <Botao
            variant="contained"
            onClick={submit}
            label={props ? "Editar" : "Criar"}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
}
