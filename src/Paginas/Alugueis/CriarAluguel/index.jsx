import { setHours, setMinutes } from "date-fns";
import InputTexto from "../../../Componentes/Inputs/InputTexto.jsx";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../Temas.jsx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Box,
  Grid,
  Typography,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from "@mui/material";
import Botao from "../../../Componentes/Botao/Botao.jsx";
import api from "../../../services/api.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function MyApp() {
  const [inicio, setInicio] = useState(setMinutes(setHours(new Date(), 12), 0));
  const [fim, setFim] = useState(setMinutes(setHours(new Date(), 15), 0));
  const [dataAtual, setDataAtual] = useState(
    setMinutes(setHours(new Date(), 12), 0)
  );
  const [rua, setRua] = useState("");
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [estado, setEstado] = useState("");
  const [cliente, setCliente] = useState("");
  const [tema, setTema] = useState("");
  const [temas, setTemas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state ? location.state : null;

  const routeChangeBack = () => {
    let path = `/alugueis`;
    navigate(path);
  };

  const handleInicio = (event) => {
    setInicio(event);
  };

  const handleFim = (event) => {
    console.log("sim");
    setFim(event);
  };

  const handleDataAtual = (event) => {
    setDataAtual(event);
  };

  const handleNome = (event) => {
    setNome(event);
  };

  const handleCliente = (event) => {
    setCliente(event);
  };

  const handleTema = (event) => {
    setTema(event);
  };

  const handleRua = (event) => {
    setRua(event);
  };

  const handleBairro = (event) => {
    setBairro(event);
  };

  const handleNumero = (event) => {
    setNumero(event);
  };

  const handleCidade = (event) => {
    setCidade(event);
  };

  const handleComplemento = (event) => {
    setComplemento(event);
  };

  const handleEstado = (event) => {
    setEstado(event);
  };

  async function submit() {
    try {
      const address_data = {
        street: rua,
        number: numero,
        complement: complemento,
        district: bairro,
        city: cidade,
        state: estado,
      };

      const address_response = await api.post("Address/", address_data);
      const address = address_response.data.id;

      const data = {
        name: nome,
        date: dataAtual,
        start_hours: inicio,
        end_hours: fim,
        client: cliente,
        theme: tema,
        address: address,
      };
      console.log(data);

      const response = props
        ? api.put(`clients/${props.id}/`, data)
        : await api.post("clients/", data);

      routeChangeBack();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const clientes = await api.get("clients/");
      setClientes(clientes.data);
      const temas = await api.get("themes/");
      setTemas(temas.data);

      if (props) {
        try {
          const response = await api.get(`rents/${props.id}/`);
          dataAtual(response.data.date);
          setInicio(response.data.start_hours);
          setFim(response.data.end_hours);
          setCliente(response.data.client);
          setTema(response.data.theme);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">
        {props ? "Edição" : "Cadastro"} de Aluguel
      </Typography>
      <div>
        <Grid
          container
          spacing={2}
          alignItems="center"
          p={2}
          sx={{ borderRadius: 1 }}
        >
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Seleciona a Data"
                  renderInput={(params) => <TextField {...params} />}
                  renderDay={(day, _value) => format(day, "dd/MM/yyyy")}
                  format="dd/MM/y"
                  sx={{ width: "100%" }}
                  value={dataAtual}
                  onChange={handleDataAtual}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  ampm={false}
                  label="Início"
                  sx={{ width: "100%" }}
                  value={inicio}
                  onChange={handleInicio}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  ampm={false}
                  label="Fim"
                  sx={{ width: "100%" }}
                  value={fim}
                  onChange={handleFim}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <InputLabel style={{ color: "#6750A4" }} id="select-client">
              Cliente
            </InputLabel>
            <Select
              labelId="select-client"
              id="id-select-client"
              value={cliente}
              color="inputs"
              onChange={handleCliente}
              input={<OutlinedInput label="Cliente" />}
              renderValue={(value) => `${value.target.value.name}`}
              MenuProps={MenuProps}
              sx={{ color: "black", width: "100%" }}
            >
              {clientes.map((item) => (
                <MenuItem key={item.id} value={item}>
                  <ListItemText primary={item.name} sx={{ padding: 0.5 }} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel style={{ color: "#6750A4" }} id="select-tema">
              Tema
            </InputLabel>
            <Select
              labelId="select-tema"
              id="id-select-tema"
              value={tema}
              color="inputs"
              onChange={handleTema}
              renderValue={(value) => `${value.target.value.name}`}
              input={<OutlinedInput label="Tema" />}
              MenuProps={MenuProps}
              sx={{ color: "black", width: "100%" }}
            >
              {temas.map((item) => (
                <MenuItem key={item.id} value={item}>
                  <ListItemText primary={item.name} sx={{ padding: 0.5 }} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputTexto
              label="Nome do aluguel"
              value={nome}
              onChange={handleNome}
            />
          </Grid>
          <Grid item xs={6}>
            <InputTexto label="Rua" value={rua} onChange={handleRua} />
          </Grid>
          <Grid item xs={6}>
            <InputTexto label="Bairro" value={bairro} onChange={handleBairro} />
          </Grid>
          <Grid item xs={6}>
            <InputTexto label="Numero" value={numero} onChange={handleNumero} />
          </Grid>
          <Grid item xs={6}>
            <InputTexto label="Cidade" value={cidade} onChange={handleCidade} />
          </Grid>
          <Grid item xs={6}>
            <InputTexto
              label="Complemento"
              value={complemento}
              onChange={handleComplemento}
            />
          </Grid>
          <Grid item xs={6}>
            <InputTexto label="Estado" value={estado} onChange={handleEstado} />
          </Grid>
        </Grid>
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
